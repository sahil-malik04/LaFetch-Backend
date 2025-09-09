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

const placeOrderUser = async (payload) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      userId,
      warehouseId,
      items, // array: [{ productId, variantId, quantity, unitPrice, discount, tax, total }]
      totalMRP,
      couponDiscount = 0,
      shippingCost = 0,
      tax = 0,
      total,
      paymentMethod, // "cod" | "prepaid"
      paymentInfo, // { provider, method, amount, providerPaymentId, providerOrderId, providerSignature }
    } = payload;

    // 1. Create Order
    const newOrder = await orders.create(
      {
        userId,
        warehouseId,
        totalMRP,
        couponDiscount,
        shippingCost,
        tax,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "pending", // prepaid → updated after gateway success
      },
      { transaction }
    );

    // 2. Create Order Items
    for (const item of items) {
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
          weight: item.weight || null,
          length: item.length || null,
          breadth: item.breadth || null,
          height: item.height || null,
        },
        { transaction }
      );
    }

    // 3. Create Payment (only if prepaid)
    let paymentRecord = null;
    if (paymentMethod === "prepaid" && paymentInfo) {
      paymentRecord = await payments.create(
        {
          orderId: newOrder.id,
          provider: paymentInfo.provider,
          method: paymentInfo.method,
          amount: paymentInfo.amount,
          currency: "INR",
          status: "initiated", // will be updated on success callback
          providerPaymentId: paymentInfo.providerPaymentId,
          providerOrderId: paymentInfo.providerOrderId,
          providerSignature: paymentInfo.providerSignature,
        },
        { transaction }
      );
    }

    await transaction.commit();

    return successResponse(
      statusCode.SUCCESS.CREATED,
      "Order placed successfully!",
      {
        order: newOrder,
        payment: paymentRecord,
      }
    );
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
    const { orderItemId, userId, reason } = body;

    // 1. Check if order item exists and belongs to user
    const orderItem = await order_items.findOne({
      where: { id: orderItemId },
      include: [{ model: orders, where: { userId } }],
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

    // 4. Send response
    return successResponse(
      statusCode.SUCCESS.CREATED,
      "Return request submitted successfully!",
      newReturn
    );
  } catch (err) {
    return rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
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
    const { orderItemId, userId, reason } = body;

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
      return successResponse(
        statusCode.SUCCESS.OK,
        "Order cancelled successfully!",
        orderItem.order
      );
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

module.exports = {
  placeOrderUser,
  orderHistoryUser,
  requestReturnUser,
  returnHistoryUser,
  requestExchangeUser,
  exchangeHistoryUser,
  requestCancelUser,
};
