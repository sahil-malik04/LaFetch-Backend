const { Op } = require("sequelize");
const { successResponse, rejectResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");
const users = require("../models/userModel");
const { generatePassword, encryptText } = require("../utils/commonFunc");

const getInternalUsersService = async () => {
  try {
    const result = await users.findAll({
      where: {
        roleId: {
          [Op.notIn]: [2, 3],
        },
        isAccountDeleted: false,
      },
      attributes: [
        "id",
        "fullName",
        "email",
        "gender",
        "phone",
        "roleId",
        "isActive",
        "isAccountDeleted",
        "isInvited",
      ],
    });
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getCustomersService = async () => {
  try {
    const result = await users.findAll({
      where: {
        roleId: {
          [Op.eq]: 3,
        },
        isAccountDeleted: false,
      },
      attributes: [
        "id",
        "fullName",
        "email",
        "gender",
        "phone",
        "roleId",
        "isActive",
      ],
    });
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const onboardInternalUserService = async (payload) => {
  try {
    const isUserExist = await users.findOne({
      where: {
        email: payload?.email,
      },
    });
    if (isUserExist) {
      if (!isUserExist.isAccountDeleted) {
        return rejectResponse(
          statusCode.CLIENT_ERROR.CONFLICT,
          "User already exists!"
        );
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.CONFLICT,
          "This account was deleted. Please contact support."
        );
      }
    }
    const password = generatePassword();
    const userCredentials = {
      email: payload?.email,
      password,
    };

    const userData = {
      fullName: payload?.fullName,
      email: payload?.email,
      password: encryptText(password),
      phone: payload?.phone,
      roleId: payload?.roleId,
      isInvited: true,
    };
    const createUser = await users.create(userData);
    if (createUser) {
      return successResponse(
        statusCode.SUCCESS.OK,
        "Success!",
        userCredentials
      );
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Error in creating the user!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateInternalUserService = async (params, body) => {
  try {
    const isUserExist = await users.findOne({
      where: {
        id: params?.userId,
        isAccountDeleted: false,
      },
    });
    if (isUserExist && isUserExist.roleId !== 2 && isUserExist.roleId !== 3) {
      const data = {
        fullName: body?.fullName,
        phone: body?.phone,
      };
      const result = await isUserExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "User updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "User not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteInternalUserService = async (params) => {
  try {
    const isUserExist = await users.findOne({
      where: {
        id: params?.userId,
        isAccountDeleted: false,
      },
    });
    if (isUserExist && isUserExist.roleId !== 2 && isUserExist.roleId !== 3) {
      const data = {
        isActive: false,
        isAccountDeleted: true,
      };
      const result = await isUserExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "User deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "User not found!"
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
  getInternalUsersService,
  getCustomersService,
  onboardInternalUserService,
  updateInternalUserService,
  deleteInternalUserService,
};
