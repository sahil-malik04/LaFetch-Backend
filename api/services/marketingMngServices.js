const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const coupons = require("../models/couponsModel");
// const promotions = require("../models/promotionsModel");
const { fn, col, where } = require("sequelize");

const addCouponUser = async (payload) => {
  try {
    const isCouponExist = await coupons.findOne({
      where: where(fn("LOWER", col("code")), payload?.code?.toLowerCase()),
    });

    if (isCouponExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Coupon code already exist!"
      );
    } else {
      const data = {
        code: payload?.code,
        name: payload?.name,
        internalNotes: payload?.internalNotes,
        description: payload?.description,
        discountType: payload?.discountType,
        maxDiscountCap: payload?.maxDiscountCap,
        minCartValue: payload?.minCartValue,
        freeShipping: payload?.freeShipping,
        firstTimeUsersOnly: payload?.firstTimeUsersOnly,
        totalUsageLimit: payload?.totalUsageLimit,
        usageLimitPerUser: payload?.usageLimitPerUser,
        applicableOn: payload?.applicableOn,
        excludeSaleItems: payload?.excludeSaleItems,
        selectUsers: payload?.selectUsers,
        targetSegments: payload?.targetSegments,
        distributedChannels: payload?.distributedChannels,
        inviteOnlyCoupon: payload?.inviteOnlyCoupon,
        startDate: payload?.startDate,
        endDate: payload?.endDate,
        enableScheduling: payload?.enableScheduling,
        status: payload?.status,
        addedBy: payload?.addedBy,
      };
      const result = await coupons.create(data);
      if (result)
        return successResponse(statusCode.SUCCESS.CREATED, "Coupon added!");
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getCouponUser = async (query) => {
  try {
    const id = Number(query?.of);
    const whereClause = {
      ...(id && { addedBy: id }),
    };
    const isCouponExist = await coupons.findAll({
      where: whereClause,
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
        code: payload?.code,
        name: payload?.name,
        internalNotes: payload?.internalNotes,
        description: payload?.description,
        discountType: payload?.discountType,
        maxDiscountCap: payload?.maxDiscountCap,
        minCartValue: payload?.minCartValue,
        freeShipping: payload?.freeShipping,
        firstTimeUsersOnly: payload?.firstTimeUsersOnly,
        totalUsageLimit: payload?.totalUsageLimit,
        usageLimitPerUser: payload?.usageLimitPerUser,
        applicableOn: payload?.applicableOn,
        excludeSaleItems: payload?.excludeSaleItems,
        selectUsers: payload?.selectUsers,
        targetSegments: payload?.targetSegments,
        distributedChannels: payload?.distributedChannels,
        inviteOnlyCoupon: payload?.inviteOnlyCoupon,
        startDate: payload?.startDate,
        endDate: payload?.endDate,
        enableScheduling: payload?.enableScheduling,
        status: payload?.status,
        updatedAt: new Date(),
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

const getCouponByIdUser = async (params) => {
  try {
    const isCouponExist = await coupons.findOne({
      where: {
        id: params?.couponId,
      },
    });
    if (isCouponExist) {
      return successResponse(statusCode.SUCCESS.OK, isCouponExist);
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

// const getPromotionsUser = async (query) => {
//   try {
//     const result = await promotions.findAll({
//       where: {
//         isActive: query?.isActive === "true",
//       },
//     });
//     return successResponse(statusCode.SUCCESS.OK, result);
//   } catch (err) {
//     throw rejectResponse(
//       statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
//       err?.message
//     );
//   }
// };

// const addPromotionUser = async (payload) => {
//   try {
//     const data = {
//       title: payload?.title,
//       description: payload?.description,
//       imageUrl: payload?.imageUrl,
//       screen: payload?.screen,
//       params: payload?.params,
//       scheduled_at: payload?.scheduled_at,
//       status: payload?.status,
//     };
//     const result = await promotions.create(data);
//     return successResponse(
//       statusCode.SUCCESS.CREATED,
//       "Promotion added!",
//       result
//     );
//   } catch (err) {
//     throw rejectResponse(
//       statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
//       err?.message
//     );
//   }
// };

// const updatePromotionUser = async (params, payload) => {
//   try {
//     const isPromotionExist = await promotions.findOne({
//       where: {
//         id: params?.promotionId,
//       },
//     });
//     if (!isPromotionExist) {
//       return rejectResponse(
//         statusCode.CLIENT_ERROR.CONFLICT,
//         "Promotion doesn't exist!"
//       );
//     } else {
//       const data = {
//         title: payload?.title,
//         description: payload?.description,
//         imageUrl: payload?.imageUrl,
//         screen: payload?.screen,
//         params: payload?.params,
//         scheduled_at: payload?.scheduled_at,
//         status: payload?.status,
//         updatedAt: new Date(),
//       };
//       const result = await isPromotionExist.update(data);
//       if (result) {
//         return successResponse(
//           statusCode.SUCCESS.OK,
//           "Promotion updated successfully!"
//         );
//       }
//     }
//   } catch (err) {
//     throw rejectResponse(
//       statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
//       err?.message
//     );
//   }
// };

// const deletePromotionUser = async (params) => {
//   try {
//     const isPromotionExist = await promotions.findOne({
//       where: {
//         id: params?.promotionId,
//       },
//     });
//     if (isPromotionExist) {
//       const result = await isPromotionExist.destroy();
//       if (result) {
//         return successResponse(
//           statusCode.SUCCESS.OK,
//           "Promotion deleted successfully!"
//         );
//       }
//     } else {
//       return rejectResponse(
//         statusCode.CLIENT_ERROR.CONFLICT,
//         "Promotion doesn't exist!"
//       );
//     }
//   } catch (err) {
//     throw rejectResponse(
//       statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
//       err?.message
//     );
//   }
// };

// const updatePromotionStatusUser = async (params, query) => {
//   try {
//     const isPromotionExist = await promotions.findOne({
//       where: {
//         id: params?.promotionId,
//       },
//     });
//     if (!isPromotionExist) {
//       return rejectResponse(
//         statusCode.CLIENT_ERROR.CONFLICT,
//         "Promotion doesn't exist!"
//       );
//     } else {
//       const data = {
//         status: query?.status,
//         updatedAt: new Date(),
//       };
//       const result = await isPromotionExist.update(data);
//       if (result) {
//         return successResponse(
//           statusCode.SUCCESS.OK,
//           "Promotion updated successfully!"
//         );
//       }
//     }
//   } catch (err) {
//     throw rejectResponse(
//       statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
//       err?.message
//     );
//   }
// };

module.exports = {
  addCouponUser,
  getCouponUser,
  updateCouponUser,
  deleteCouponUser,
  getCouponByIdUser,
  // getPromotionsUser,
  // addPromotionUser,
  // updatePromotionUser,
  // deletePromotionUser,
  // updatePromotionStatusUser,
};
