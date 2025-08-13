const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const warehouse = require("../models/warehouseModel");
const { fn, col, where } = require("sequelize");

const addWarehouseUser = async (payload) => {
  try {
    const isWarehouseExist = await warehouse.findOne({
      where: where(fn("LOWER", col("name")), payload?.name?.toLowerCase()),
    });

    if (isWarehouseExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Warehouse already exist with the same name!"
      );
    } else {
      const data = {
        name: payload?.warehouseName,
        address: payload?.address,
        city: payload?.city,
        state: payload?.state,
        postalCode: payload?.postalCode,
        capacity: payload?.postalCode,
        contactNo: payload?.contactNo,
      };
      const result = await warehouse.create(data);
      if (result) {
        return successResponse(statusCode.SUCCESS.CREATED, "Warehouse added!");
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getWarehousesUser = async () => {
  try {
    const result = await warehouse.findAll();
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateWarehouseUser = async (params, payload) => {
  try {
    const isWarehouseExist = await warehouse.findOne({
      where: {
        id: params?.warehouseId,
      },
    });
    if (isWarehouseExist) {
      const data = {
        name: payload?.name,
        address: payload?.address,
        city: payload?.city,
        state: payload?.state,
        postalCode: payload?.postalCode,
        capacity: payload?.postalCode,
        updatedAt: new Date(),
      };
      const result = await isWarehouseExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Warehouse updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Warehouse not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteWarehouseUser = async (params) => {
  try {
    const isWarehouseExist = await warehouse.findOne({
      where: {
        id: params?.warehouseId,
      },
    });
    if (isWarehouseExist) {
      const result = await isWarehouseExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Warehouse deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Warehouse not found!"
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
  addWarehouseUser,
  getWarehousesUser,
  updateWarehouseUser,
  deleteWarehouseUser,
};
