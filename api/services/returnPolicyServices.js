const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const returnPolicies = require("../models/returnPolicyModel");
const brands = require("../models/brandsModel");
const vendors = require("../models/vendorsModel");
const users = require("../models/userModel");

const getReturnPoliciesUser = async (vendorID) => {
  try {
    const isPolicyExist = await returnPolicies.findAll({
      where: {
        isActive: true,
        ...(vendorID && { vendorId: vendorID }),
      },
      include: [
        {
          model: brands,
          attributes: ["id", "name"],
        },
        {
          model: vendors,
          attributes: ["id"],
          include: [
            {
              model: users,
              attributes: ["id", "fullName", "email"],
            },
          ],
        },
      ],
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
