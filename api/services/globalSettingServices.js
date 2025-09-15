const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const globalSettings = require("../models/globalSettingsModel");
const brandSettings = require("../models/brandSettingsModel");
const fees = require("../models/feesModel");

const adminSettingsUser = async () => {
  try {
    const result = await globalSettings.findAll();
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateAdminSettingsUser = async (payload) => {
  try {
    const settings = await globalSettings.findOne();
    if (!settings) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Global settings not found"
      );
    } else {
      const { quickDeliveryEnabled, defaultOperatingHours } = payload;

      const data = {
        quickDeliveryEnabled,
        defaultOperatingHours,
      };
      const result = await settings.update(data);
      return successResponse(statusCode.SUCCESS.OK, "Success!", result);
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addBrandSettingsUser = async (params, payload) => {
  try {
    const [result, created] = await brandSettings.upsert(
      {
        brandId: params?.brandId,
        brandEnabled: payload?.brandEnabled,
        quickDeliveryEnabled: payload?.quickDeliveryEnabled,
        operatingHours: payload?.operatingHours,
      },
      { returning: true }
    );

    return successResponse(
      statusCode.SUCCESS.OK,
      created ? "Brand settings created!" : "Brand settings updated!",
      result
    );
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getBrandSettingsUser = async (params) => {
  try {
    const result = await brandSettings.findOne({
      where: {
        brandId: params?.brandId,
      },
    });
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getFeesGlobalUser = async (params) => {
  try {
    const result = await fees.findAll();
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateFeesGlobalUser = async (payload) => {
  try {
    const isFees = await fees.findOne();
    if (!isFees) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Fees settings not found"
      );
    } else {
      const data = {
        scope: payload?.scope,
        brandId: payload?.brandId,
        convenienceFeeType: payload?.convenienceFeeType,
        convenienceFeeValue: payload?.convenienceFeeValue,
        gstPercent: payload?.gstPercent,
        deliveryBaseFee: payload?.deliveryBaseFee,
        deliveryPerKm: payload?.deliveryPerKm,
        freeDeliveryThreshold: payload?.freeDeliveryThreshold,
        updatedAt: new Date(),
      };
      const result = await isFees.update(data);
      return successResponse(statusCode.SUCCESS.OK, "Success!", result);
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = {
  adminSettingsUser,
  updateAdminSettingsUser,
  addBrandSettingsUser,
  getBrandSettingsUser,
  getFeesGlobalUser,
  updateFeesGlobalUser,
};
