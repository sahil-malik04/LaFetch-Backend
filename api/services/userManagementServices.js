const { Op } = require("sequelize");
const { successResponse, rejectResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");
const users = require("../models/userModel");

const getInternalUsersService = async () => {
  try {
    const result = await users.findAll({
      where: {
        roleId: {
          [Op.ne]: 3,
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

module.exports = {
  getInternalUsersService,
  getCustomersService,
};
