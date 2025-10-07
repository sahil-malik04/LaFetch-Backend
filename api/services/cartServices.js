const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const { responseMessages } = require("../utils/dataUtils");
const cart = require("../models/cartModel");
const products = require("../models/productsModel");
const productVariants = require("../models/productVariantModel");

const addToCartUser = async (payload) => {
  try {
    const existingCartItem = await cart.findOne({
      where: {
        userId: payload?.userId,
        productId: payload?.productId,
        variantId: payload?.variantId,
      },
    });

    if (!existingCartItem) {
      const data = {
        userId: payload?.userId,
        productId: payload?.productId,
        variantId: payload?.variantId,
        status: payload?.status,
      };
      const result = await cart.create(data);
      return successResponse(
        statusCode.SUCCESS.CREATED,
        "Item added to cart",
        result
      );
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "This product is already in your cart."
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getCartItemsUser = async (params) => {
  try {
    const result = await cart.findAll({
      where: {
        userId: params?.userId,
      },
      include: [products, productVariants],
    });

    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const removeCartItemUser = async (body) => {
  try {
    const findCartItem = await cart.findOne({
      where: {
        userId: body?.userId,
        productId: body?.productId,
      },
    });

    if (findCartItem) {
      const result = await findCartItem.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Cart Item removed successfully!"
        );
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.SERVER_ERROR,
          "Failed to delete cart item!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Cart item not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = {
  addToCartUser,
  getCartItemsUser,
  removeCartItemUser,
};
