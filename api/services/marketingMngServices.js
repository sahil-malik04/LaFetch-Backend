const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const taxes = require("../models/taxesModel");
const coupons = require("../models/couponsModel");

const addCouponUser = async (payload) => {
  try {
    const isCouponExist = await coupons.findOne({
      where: {
        code: payload?.code,
      },
    });

    if (isCouponExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Coupon Already Exist"
      );
    } else {
      const data = {
        brandId: payload?.brandId,
        code: payload?.code,
        description: payload?.description,
        isPrivate: payload?.isPrivate,
        value: payload?.value,
        minPurchase: payload?.minPurchase,
        maxDiscountAmount: payload?.maxDiscountAmount,
        useLimit: payload?.useLimit,
        userLimit: payload?.userLimit,
        startDate: payload?.startDate,
        endDate: payload?.endDate,
      };
      const result = await coupons.create(data);
      return successResponse(
        statusCode.SUCCESS.CREATED,
        "Coupon added!",
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

const getCouponUser = async () => {
  try {
    const isCouponExist = await coupons.findAll({
      where: {
        isActive: true,
      },
    });
    return successResponse(
      statusCode.SUCCESS.CREATED,
      "Success!",
      isCouponExist
    );
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateCouponUser = async (params, payload) => {
  try {
    const isCouponExist = await coupons.findOne({
      where: {
        id: params?.couponId,
      },
    });
    if (isCouponExist) {
      const data = {
        brandId: payload?.brandId,
        code: payload?.code,
        description: payload?.description,
        isPrivate: payload?.isPrivate,
        value: payload?.value,
        minPurchase: payload?.minPurchase,
        maxDiscountAmount: payload?.maxDiscountAmount,
        useLimit: payload?.useLimit,
        userLimit: payload?.userLimit,
        startDate: payload?.startDate,
        endDate: payload?.endDate,
      };
      const result = await isCouponExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Coupon updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Coupon not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteCouponUser = async (params) => {
  try {
    const isCouponExist = await coupons.findOne({
      where: {
        id: params?.couponId,
      },
    });
    if (isCouponExist) {
      const result = await isCouponExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Coupon deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Coupon not found!"
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
  addCouponUser,
  getCouponUser,
  updateCouponUser,
  deleteCouponUser,
};
