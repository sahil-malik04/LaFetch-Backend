const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const { responseMessages } = require("../utils/dataUtils");
const reviews = require("../models/reviewsModel");

const addReviewUser = async (payload) => {
  try {
    const isReviewExist = await reviews.findOne({
      where: {
        userId: payload?.userId,
        productId: payload?.productId,
        orderId: payload?.orderId,
      },
    });

    if (isReviewExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Review Already Exist"
      );
    } else {
      const data = {
        userId: payload?.userId,
        orderId: payload?.orderId,
        productId: payload?.productId,
        rating: payload?.rating,
        comment: payload?.comment,
      };
      const result = await reviews.create(data);
      return successResponse(
        statusCode.SUCCESS.CREATED,
        "Review added",
        result
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getReviewsUser = async (params) => {
  try {
    const isReviewExist = await reviews.findAll({
      where: {
        productId: params?.productId,
      },
    });

    return successResponse(
      statusCode.SUCCESS.OK,
      "Success!",
      isReviewExist
    );
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = {
  addReviewUser,
  getReviewsUser,
};
