const users = require("../models/userModel");
const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const { responseMessages } = require("../utils/dataUtils");

const getUserProfileService = async (payload) => {
  try {
    const getProfile = await users.findOne({
      where: {
        id: payload?.userId,
      },
      attributes: ["id", "fullName", "email", "gender", "phone"],
    });
    if (getProfile) {
      return successResponse(statusCode.SUCCESS.OK, "Success!", getProfile);
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

const addAddressUser = async (payload) => {
  try {
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = {
  getUserProfileService,
  addAddressUser,
};
