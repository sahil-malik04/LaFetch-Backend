const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const roles = require("../models/roleModel");
const { fn, col, where } = require("sequelize");

const getRolesUser = async () => {
  try {
    const result = await roles.findAll({
      attributes: ["id", "name", "permissions"],
    });
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateRoleUser = async (params, payload) => {
  try {
    const isRoleExist = await roles.findOne({
      where: {
        id: params?.roleId,
      },
    });
    if (isRoleExist) {
      const data = {
        name: payload?.name,
        permissions: payload?.permissions,
        updatedAt: new Date(),
      };
      const result = await isRoleExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Role updated successfully!"
        );
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.SERVER_ERROR,
          "There's some issue updating the role."
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Role not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteRoleUser = async (params) => {
  try {
    const isRoleExist = await roles.findOne({
      where: {
        id: params?.roleId,
      },
    });
    if (isRoleExist) {
      const result = await isRoleExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Role deleted successfully!"
        );
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.SERVER_ERROR,
          "There's some issue deleting the role."
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Role not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const createRoleUser = async (body) => {
  try {
    const isRoleExist = await roles.findOne({
      where: where(fn("LOWER", col("name")), body?.name.toLowerCase()),
    });
    if (!isRoleExist) {
      const data = {
        name: body?.name.toUpperCase(),
        permission: body?.permission,
      };
      const result = await roles.create(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.CREATED,
          "Role created successfully!"
        );
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.SERVER_ERROR,
          "There's some issue creating the role."
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Role already exist!"
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
  getRolesUser,
  updateRoleUser,
  deleteRoleUser,
  createRoleUser,
};
