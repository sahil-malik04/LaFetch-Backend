const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const roles = require("../models/roleModel");
const { Op } = require("sequelize");

const getRolesUser = async () => {
  try {
    const result = await roles.findAll({
      where: {
        id: {
          [Op.notIn]: [2, 3],
        },
      },
      attributes: ["id", "name"],
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
  getRolesUser,
};
