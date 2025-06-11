const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const { responseMessages } = require("../utils/dataUtils");
const wishlist = require("../models/wishlistModel");
const products = require("../models/productsModel");
const wishlistBoards = require("../models/wishlistBoards");

const addWishlistBoardUser = async (payload) => {
  try {
    const data = {
      userId: payload?.userId,
      name: payload?.name,
    };

    const result = await wishlistBoards.create(data);

    if (result) {
      const data = {
        userId: payload?.userId,
        boardId: result?.id,
        productId: payload?.productId,
      };
      const addWishlist = await wishlist.create(data);
      if (addWishlist)
        return successResponse(
          statusCode.SUCCESS.CREATED,
          "Wishlist Board added successfully!"
        );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteWishlistBoardUser = async (payload) => {
  try {
    const deleteWishlist = await wishlist.destroy({
      where: {
        boardId: payload?.boardId,
      },
    });

    if (deleteWishlist) {
      const findBoard = await wishlistBoards.findOne({
        where: {
          id: payload?.boardId,
        },
      });
      if (findBoard) {
        const result = await findBoard.destroy();

        if (result) {
          return successResponse(
            statusCode.SUCCESS.OK,
            "Wishlist Board deleted successfully!"
          );
        }
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const renameBoardUser = async (params, payload) => {
  try {
    const findBoard = await wishlistBoards.findOne({
      where: {
        id: params?.boardId,
      },
    });

    if (findBoard) {
      const data = {
        name: payload?.name,
      };
      const result = await findBoard.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Wishlist Board renamed successfully!"
        );
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getWishlistUser = async (payload) => {
  try {
    const result = await wishlist.findAll({
      where: {
        userId: payload?.userId,
      },
      include: [products, wishlistBoards],
      attributes: ["id"],
    });
    if (result) {
      return successResponse(statusCode.SUCCESS.OK, "Success!", result);
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        responseMessages.USER_NOT_EXIST
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addToWishlistUser = async (payload) => {
  try {
    const data = {
      userId: payload?.userId,
      productId: payload?.productId,
      boardId: payload?.boardId,
    };

    const result = await wishlist.create(data);

    if (result) {
      return successResponse(
        statusCode.SUCCESS.CREATED,
        "Wishlist added successfully!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const removeFromWishlistUser = async (payload) => {
  try {
    const isProductExist = await wishlist.findOne({
      where: {
        userId: payload?.userId,
        productId: payload?.productId,
        boardId: payload?.boardId,
      },
    });

    const result = await isProductExist.destroy();

    if (result) {
      return successResponse(
        statusCode.SUCCESS.OK,
        "Product removed from wishlist successfully!"
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
  addWishlistBoardUser,
  deleteWishlistBoardUser,
  renameBoardUser,
  getWishlistUser,
  addToWishlistUser,
  removeFromWishlistUser,
};
