const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const orders = require("../models/ordersModel");
const payments = require("../models/paymentsModel");
const { sequelize } = require("../db/dbConfig");
const order_items = require("../models/orderItemsModel");
const users = require("../models/userModel");
const products = require("../models/productsModel");
const exchangeOrders = require("../models/exchangeOrders");
const returnOrders = require("../models/returnOrdersModel");
const financialLedger = require("../models/financialLedgerModel");
const settlements = require("../models/settlementsModel");
const user_addresses = require("../models/userAddressesModel");
const {
  authenticateShiprocket,
  placeShiprocket,
  cancelShiprocketOrder,
  returnShiprocketOrder,
} = require("../utils/shipRocketAPIs");
const inventories = require("../models/inventoriesModel");
const warehouse = require("../models/warehouseModel");
const brands = require("../models/brandsModel");
const vendors = require("../models/vendorsModel");
const productVariants = require("../models/productVariantModel");

const placeOrderUser = async (payload) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      userId,
      shippingAddressId,
      items,
      totalMRP,
      couponDiscount = 0,
      shippingCost = 0,
      tax = 0,
      total,
      paymentMethod,
      paymentInfo,
    } = payload;

    const itemsWithWarehouse = await Promise.all(
      items.map(async (item) => {
        const variant = await productVariants.findByPk(item.variantId, {
          include: [
            {
              model: inventories,
              attributes: ["id", "warehouseId"],
              include: [
                {
                  model: warehouse,
                  attributes: ["id", "name"],
                },
              ],
            },
            {
              model: products,
              attributes: ["id", "weight", "length", "breadth", "height"],
            },
          ],
        });

        if (!variant || !variant.inventory || !variant.inventory.warehouse) {
          throw new Error(`No warehouse found for variant ${item.variantId}`);
        }

        const warehouseData = variant.inventory.warehouse;
        const productInfo = variant.product;

        return {
          ...item,
          warehouseId: warehouseData.id,
          pickup_location: warehouseData.name,
          productInfo,
        };
      })
    );

    // 1. Create Order
    const newOrder = await orders.create(
      {
        userId,
        shippingAddressId,
        totalMRP,
        couponDiscount,
        shippingCost,
        tax,
        total,
      },
      { transaction }
    );

    // 2. Create Order Items
    for (const item of itemsWithWarehouse) {
      await order_items.create(
        {
          orderId: newOrder.id,
          productId: item.productId,
          variantId: item.variantId || null,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          discount: item.discount || 0,
          tax: item.tax || 0,
          total: item.total,
          warehouseId: item.warehouseId,
        },
        { transaction }
      );
    }

    let paymentRecord = null;
    if (paymentMethod === "prepaid" && paymentInfo) {
      paymentRecord = await payments.create(
        {
          orderId: newOrder.id,
          provider: paymentInfo.provider,
          method: paymentInfo.method,
          amount: paymentInfo.amount,
          currency: "INR",
          status: "success",
          providerPaymentId: paymentInfo.providerPaymentId,
          providerOrderId: paymentInfo.providerOrderId,
          providerSignature: paymentInfo.providerSignature,
        },
        { transaction }
      );
    }

    await transaction.commit();

    const loginRes = await authenticateShiprocket();
    if (loginRes) {
      const shiprocketToken = loginRes.token;

      const findAddress = await user_addresses.findOne({
        where: {
          id: shippingAddressId,
        },
        include: [
          {
            model: users,
            attributes: ["id", "email"],
          },
        ],
      });

      let shiprocketOrderRes;
      for (const item of itemsWithWarehouse) {
        const shiprocketOrderPayload = {
          order_id: `ORDER-${newOrder.id}-${item.variantId}`,
          order_date: new Date().toISOString().slice(0, 19).replace("T", " "),
          pickup_location: item.pickup_location,
          comment: "LaFetch Order",
          billing_customer_name: findAddress?.contactName,
          billing_last_name: "",
          billing_address: findAddress?.line1,
          billing_address_2: findAddress?.line2,
          billing_city: findAddress?.city,
          billing_pincode: findAddress?.postalCode,
          billing_state: findAddress?.state,
          billing_country: findAddress?.country,
          billing_email: findAddress?.user?.email,
          billing_phone: findAddress?.contactPhone,
          shipping_is_billing: true,
          order_items: [
            {
              name: item.productName,
              sku: item.sku,
              units: item.quantity,
              selling_price: item.unitPrice,
              hsn: item.hsn || "",
            },
          ],
          payment_method: paymentMethod === "cod" ? "COD" : "Prepaid",
          sub_total: total,
          length: item.productInfo.length || 10,
          breadth: item.productInfo.breadth || 10,
          height: item.productInfo.height || 5,
          weight: item.productInfo.weight || 0.5,
        };

        shiprocketOrderRes = await placeShiprocket(
          shiprocketOrderPayload,
          shiprocketToken
        );
      }

      // update your DB with Shiprocket IDs if successful
      if (shiprocketOrderRes?.order_id && shiprocketOrderRes?.shipment_id) {
        await orders.update(
          {
            shiprocketOrderId: shiprocketOrderRes.order_id,
            shiprocketShipmentId: shiprocketOrderRes.shipment_id,
          },
          { where: { id: newOrder.id } }
        );

        return successResponse(
          statusCode.SUCCESS.CREATED,
          "Order placed successfully!",
          {
            order: newOrder,
            payment: paymentRecord,
            shiprocket: shiprocketOrderRes,
          }
        );
      } else {
        return rejectResponse(
          statusCode.SERVER_ERROR.BAD_GATEWAY,
          shiprocketOrderRes?.message
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.UNAUTHORIZED,
        "Error in generating shipRocket token!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const orderHistoryUser = async (params) => {
  try {
    const isUserExist = await users.findOne({
      where: {
        id: params?.userId,
        isActive: true,
      },
    });
    if (!isUserExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "User doesn't exist!"
      );
    } else {
      const userOrders = await orders.findAll({
        where: { userId: params?.userId },
        include: [
          {
            model: order_items,
            include: [
              {
                model: products,
              },
            ],
          },
        ],
      });
      return successResponse(
        statusCode.SUCCESS.OK,
        "Order history fetched successfully!",
        userOrders
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const requestReturnUser = async (body) => {
  try {
    const { orderItemId, userId, reason, addressId, shipRocketId } = body;

    // 1. Check if order item exists and belongs to user
    const orderItem = await order_items.findOne({
      where: { id: orderItemId },
      include: [
        {
          model: orders,
          where: { userId },
        },
        {
          model: products,
          include: [
            {
              model: brands,
              attributes: ["name"],
              include: [
                {
                  model: vendors, // assuming your model is named `vendors`
                  attributes: ["id", "businessEmail"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!orderItem) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Order item not found or doesn't belong to user!"
      );
    }

    // 2. Ensure order is delivered
    if (orderItem.order.status !== "delivered") {
      return rejectResponse(
        statusCode.CLIENT_ERROR.BAD_REQUEST,
        "Only delivered orders can be returned!"
      );
    }

    // 3. Create return order entry
    const newReturn = await returnOrders.create({
      orderId: orderItem.orderId,
      orderItemId: orderItem.id,
      reason: reason || null,
      status: "requested",
      requestedAt: new Date(),
    });

    const findAddress = await user_addresses.findOne({
      where: {
        id: addressId,
      },
      include: [
        {
          model: users,
          attributes: ["id", "email"],
        },
      ],
    });

    const findWarehouse = await inventories.findOne({
      where: {
        variantId: orderItem?.variantId,
      },
      include: [warehouse],
    });

    const loginRes = await authenticateShiprocket();

    if (loginRes) {
      const shiprocketToken = loginRes.token;

      const shiprocketOrderPayload = {
        order_id: shipRocketId,
        order_date: orderItem.createdAt.toISOString().split("T")[0],
        pickup_customer_name: findAddress?.contactName,
        pickup_address: findAddress?.line1,
        pickup_address_2: findAddress?.line2,
        pickup_city: findAddress?.city,
        pickup_state: findAddress?.state,
        pickup_country: findAddress?.country,
        pickup_pincode: findAddress?.postalCode,
        pickup_email: findAddress?.user?.email,
        pickup_phone: findAddress?.contactPhone,
        shipping_customer_name: orderItem?.product?.brand?.name,
        shipping_last_name: "",
        shipping_address: findWarehouse?.warehouse?.address,
        shipping_city: findWarehouse?.warehouse?.city,
        shipping_country: findWarehouse?.warehouse?.country,
        shipping_pincode: findWarehouse?.warehouse?.postalCode,
        shipping_state: findWarehouse?.warehouse?.state,
        shipping_email: orderItem?.product?.brand?.vendors[0]?.businessEmail,
        shipping_phone: Number(findWarehouse?.warehouse?.contactNo) || "",
        order_items: [
          {
            sku: orderItem?.product?.sku,
            name: orderItem?.product?.title,
            units: orderItem?.quantity,
            selling_price: orderItem?.product?.sellingAmount,
            discount: 0,
            qc_enable: true,
            hsn: "",
            brand: "",
            qc_size: "",
          },
        ],
        payment_method: "PREPAID",
        total_discount: "0",
        sub_total: orderItem?.product?.sellingAmount,
        length: orderItem?.product?.length,
        breadth: orderItem?.product?.breadth,
        height: orderItem?.product?.height,
        weight: orderItem?.product?.weight,
      };

      const shiprocketOrderRes = await returnShiprocketOrder(
        shiprocketOrderPayload,
        shiprocketToken
      );

      // 4. Send response
      return successResponse(
        statusCode.SUCCESS.CREATED,
        "Return request submitted successfully!",
        shiprocketOrderRes
      );
    }
  } catch (err) {
    return rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.response?.data?.message || err?.message
    );
  }
};

const returnHistoryUser = async (params) => {
  try {
    const { userId } = params;

    const returnRequests = await returnOrders.findAll({
      include: [
        {
          model: orders,
          required: true,
          where: { userId }, // only this user's orders
          attributes: ["id", "status", "orderedAt", "deliveredAt"],
        },
        {
          model: order_items,
          required: true,
          attributes: ["id", "productId", "variantId", "quantity", "total"],
          include: [
            {
              model: products,
            },
          ],
        },
      ],
      order: [["requestedAt", "DESC"]],
    });

    return successResponse(
      statusCode.SUCCESS.OK,
      "User return requests fetched successfully!",
      returnRequests
    );
  } catch (err) {
    return rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const requestExchangeUser = async (body) => {
  try {
    const { orderItemId, userId, newVariantId, reason } = body;

    // if order item exists & belongs to user
    const orderItem = await order_items.findOne({
      where: { id: orderItemId },
      include: [
        {
          model: orders,
          required: true,
          where: { userId },
        },
      ],
    });

    if (!orderItem) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Order item not found or doesn't belong to this user!"
      );
    }

    if (orderItem.order.status !== "delivered") {
      return rejectResponse(
        statusCode.CLIENT_ERROR.BAD_REQUEST,
        "Exchange can only be requested for delivered orders!"
      );
    }

    const newExchange = await exchangeOrders.create({
      orderId: orderItem.orderId,
      orderItemId: orderItem.id,
      oldVariantId: orderItem.variantId,
      newVariantId,
      reason: reason || "Size issue",
      status: "requested",
      requestedAt: new Date(),
      // newOrderId will be filled once replacement order is placed
    });

    await order_items.update(
      { variantId: newVariantId },
      { where: { id: orderItemId } }
    );

    return successResponse(
      statusCode.SUCCESS.CREATED,
      "Exchange request submitted successfully!",
      newExchange
    );
  } catch (err) {
    return rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const exchangeHistoryUser = async (params) => {
  try {
    const { userId } = params;

    const history = await exchangeOrders.findAll({
      include: [
        {
          model: order_items,
          include: [
            {
              model: orders,
              where: { userId }, // ensure belongs to user
              attributes: ["id", "status", "orderedAt", "deliveredAt"],
            },
            {
              model: products,
            },
          ],
        },
      ],
      order: [["requestedAt", "DESC"]],
    });

    return successResponse(
      statusCode.SUCCESS.OK,
      "Exchange history fetched successfully!",
      history
    );
  } catch (err) {
    return rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const requestCancelUser = async (body) => {
  try {
    const { orderItemId, userId, reason, shipRocketId } = body;

    const orderItem = await order_items.findOne({
      where: { id: orderItemId },
      include: [
        {
          model: orders,
          required: true,
          where: { userId },
        },
      ],
    });

    if (!orderItem) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Order item not found or doesn't belong to this user!"
      );
    }
    if (
      orderItem.order.status === "placed" ||
      orderItem.order.status === "confirmed"
    ) {
      await orderItem.order.update({
        status: "cancelled",
        cancelledAt: new Date(),
        internalNote: reason || null,
      });

      const loginRes = await authenticateShiprocket();
      if (loginRes) {
        const shiprocketToken = loginRes.token;

        const cancelPayload = {
          ids: [shipRocketId],
        };

        await cancelShiprocketOrder(cancelPayload, shiprocketToken);
        return successResponse(
          statusCode.SUCCESS.OK,
          "Order cancelled successfully!",
          orderItem.order
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.BAD_REQUEST,
        "Cancel can only be requested for placed or confirmed orders!"
      );
    }
  } catch (err) {
    return rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const orderHistoryAdminUser = async (query) => {
  try {
    let result;
    if (query?.order === "return") {
      // All return orders
      result = await returnOrders.findAll({
        include: [
          {
            model: orders,
            required: true,
            attributes: ["id", "userId", "status", "orderedAt", "deliveredAt"],
          },
          {
            model: order_items,
            required: true,
            attributes: ["id", "productId", "variantId", "quantity", "total"],
            include: [
              {
                model: products,
              },
            ],
          },
        ],
        order: [["requestedAt", "DESC"]],
      });
    } else if (query?.order === "exchange") {
      // All exchange orders
      result = await exchangeOrders.findAll({
        include: [
          {
            model: order_items,
            include: [
              {
                model: orders,
                attributes: [
                  "id",
                  "userId",
                  "status",
                  "orderedAt",
                  "deliveredAt",
                ],
              },
              {
                model: products,
              },
            ],
          },
        ],
        order: [["requestedAt", "DESC"]],
      });
    } else {
      // All placed orders
      result = await orders.findAll({
        where: {
          status: query?.order,
        },
        include: [
          {
            model: order_items,
            include: [
              {
                model: products,
              },
            ],
          },
        ],
        order: [["orderedAt", "DESC"]],
      });
    }

    return successResponse(
      statusCode.SUCCESS.OK,
      "Order history fetched successfully!",
      result
    );
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const viewOrderHistoryUser = async (params) => {
  try {
    const { orderItemId } = params;

    if (!orderItemId) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.BAD_REQUEST,
        "Order item ID is required"
      );
    }

    const orderItem = await order_items.findOne({
      where: { id: orderItemId },
      include: [
        {
          model: orders,
          required: true,
        },
        {
          model: products,
          required: true,
        },
      ],
    });

    if (!orderItem) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Order item not found"
      );
    }

    return successResponse(
      statusCode.SUCCESS.OK,
      "Order details fetched successfully!",
      orderItem
    );
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getFinancialLedgersUser = async () => {
  try {
    const result = await financialLedger.findAll();

    return successResponse(
      statusCode.SUCCESS.OK,
      "Financial ledgers fetched successfully!",
      result
    );
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getSettlementsUser = async () => {
  try {
    const result = await settlements.findAll();

    return successResponse(
      statusCode.SUCCESS.OK,
      "settlements fetched successfully!",
      result
    );
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = {
  placeOrderUser,
  orderHistoryUser,
  requestReturnUser,
  returnHistoryUser,
  requestExchangeUser,
  exchangeHistoryUser,
  requestCancelUser,
  orderHistoryAdminUser,
  viewOrderHistoryUser,
  getFinancialLedgersUser,
  getSettlementsUser,
};
