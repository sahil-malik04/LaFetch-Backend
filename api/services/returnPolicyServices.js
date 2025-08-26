const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const returnPolicies = require("../models/returnPolicyModel");

const getReturnPoliciesUser = async (query) => {
  try {
    const id = Number(query?.of);
    const whereClause = { isActive: true };

    if (id) {
      whereClause.addedBy = id;
    }

    const isPolicyExist = await returnPolicies.findAll({
      where: whereClause,
    });
    return successResponse(statusCode.SUCCESS.OK, "Success!", isPolicyExist);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addReturnPolicyUser = async (payload) => {
  try {
    const data = {
      name: payload?.name,
      description: payload?.description,
      vendorId: payload?.vendorId,
      brandId: payload?.brandId,
    };
    const result = await returnPolicies.create(data);
    return successResponse(statusCode.SUCCESS.CREATED, "Return policy added!");
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateReturnPolicyUser = async (params, payload) => {
  try {
    const isPolicyExist = await returnPolicies.findOne({
      where: {
        id: params?.policyId,
      },
    });
    if (isPolicyExist) {
      const data = {
        name: payload?.name,
        description: payload?.description,
        vendorId: payload?.vendorId,
        brandId: payload?.brandId,
      };
      const result = await isPolicyExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Return policy updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Return policy not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteReturnPolicyUser = async (params) => {
  try {
    const isPolicyExist = await returnPolicies.findOne({
      where: {
        id: params?.policyId,
      },
    });
    if (isPolicyExist) {
      const result = await isPolicyExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Return policy deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Policy not found!"
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
  addReturnPolicyUser,
  getReturnPoliciesUser,
  updateReturnPolicyUser,
  deleteReturnPolicyUser,
};
