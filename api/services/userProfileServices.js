const users = require("../models/userModel");
const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const { responseMessages } = require("../utils/dataUtils");
const user_addresses = require("../models/userAddressesModel");

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
    const isUserExist = await users.findOne({
      where: {
        id: payload?.userId,
      },
    });
    if (isUserExist) {
      const data = {
        userId: payload?.userId,
        contactName: payload?.contactName,
        contactPhone: payload?.contactPhone,
        line1: payload?.line1,
        line2: payload?.line2,
        country: payload?.country,
        state: payload?.state,
        city: payload?.city,
        postalCode: payload?.postalCode,
        isDefaultAddress: payload?.isDefaultAddress || false,
        latitude: payload?.latitude,
        longitude: payload?.longitude,
        type: payload?.type,
      };

      if (data.isDefaultAddress) {
        await user_addresses.update(
          { isDefaultAddress: false },
          { where: { userId: data.userId } }
        );
      }
      const createAddress = await user_addresses.create(data);

      if (createAddress) {
        return successResponse(
          statusCode.SUCCESS.CREATED,
          "Address added successfully!"
        );
      }
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

const getAddressUser = async (payload) => {
  try {
    const getProfile = await user_addresses.findAll({
      where: {
        userId: payload?.userId,
      },
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

const updateAddressUser = async (payload) => {
  try {
    const isAddressExist = await user_addresses.findOne({
      where: {
        id: payload?.addressId,
      },
    });

    if (isAddressExist) {
      const data = {
        contactName: payload?.contactName,
        contactPhone: payload?.contactPhone,
        line1: payload?.line1,
        line2: payload?.line2,
        country: payload?.country,
        state: payload?.state,
        city: payload?.city,
        postalCode: payload?.postalCode,
        type: payload?.type,
        isDefaultAddress: payload?.isDefaultAddress || false,
      };

      if (data.isDefaultAddress) {
        await user_addresses.update(
          { isDefaultAddress: false },
          { where: { userId: payload?.userId } }
        );
      }
      const updateAddress = await isAddressExist.update(data);

      if (updateAddress) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Address updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Address doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteAddressUser = async (payload) => {
  try {
    const isAddressExist = await user_addresses.findOne({
      where: {
        id: payload?.addressId,
      },
    });

    if (isAddressExist) {
      const result = await isAddressExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Address Deleted Successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Address doesn't exist!"
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
  getUserProfileService,
  addAddressUser,
  getAddressUser,
  updateAddressUser,
  deleteAddressUser,
};
