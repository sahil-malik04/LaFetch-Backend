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
        "isInvitationAccepted"
      ],
    });
    return successResponse(statusCode.SUCCESS.CREATED, "Success!", result);
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
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "User already exist!"
      );
    } else {
      const password = generatePassword();
      const userCredentials = {
        email: payload?.email,
        password,
      };

      const userData = {
        fullName: payload?.name,
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
    }
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
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
};
