const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const taxes = require("../models/taxesModel");

const addTaxUser = async (payload) => {
  try {
    const isTaxExist = await taxes.findOne({
      where: {
        name: payload?.name,
      },
    });

    if (isTaxExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Tax Already Exist"
      );
    } else {
      const data = {
        name: payload?.name,
        value: payload?.value,
      };
      const result = await taxes.create(data);
      return successResponse(statusCode.SUCCESS.CREATED, "Tax added!", result);
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getTaxesuser = async () => {
  try {
    const isTaxExist = await taxes.findAll();
    return successResponse(statusCode.SUCCESS.CREATED, "Success!", isTaxExist);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateTaxUser = async (params, body) => {
  try {
    const isTaxExist = await taxes.findOne({
      where: {
        id: params?.taxId,
      },
    });
    if (isTaxExist) {
      const data = {
        name: body?.name,
        value: body?.value,
      };
      const result = await isTaxExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Tax updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Tax not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteTaxuser = async (params) => {
  try {
    const isTaxExist = await taxes.findOne({
      where: {
        id: params?.taxId,
      },
    });
    if (isTaxExist) {
      const result = await isTaxExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Tax deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Tax not found!"
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
  addTaxUser,
  getTaxesuser,
  updateTaxUser,
  deleteTaxuser,
};
