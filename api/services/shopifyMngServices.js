const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const shopifyAccounts = require("../models/shopifyAccountsModel");
const vendors = require("../models/vendorsModel");
const users = require("../models/userModel");

const addShopifyAccountUser = async (payload) => {
  try {
    const isAccountExist = await shopifyAccounts.findOne({
      where: {
        vendorId: payload?.vendorId,
      },
    });

    if (isAccountExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Vendor shopify credentials already exist!"
      );
    } else {
      const data = {
        vendorId: payload?.vendorId,
        apiURL: `https://${payload?.apiURL}/admin/api/graphql.json`,
        accessToken: payload?.accessToken,
      };
      await shopifyAccounts.create(data);
      return successResponse(
        statusCode.SUCCESS.CREATED,
        "Shopify account added!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getShopifyAccountsUser = async () => {
  try {
    const result = await shopifyAccounts.findAll({
      include: [
        {
          model: vendors,
          attributes: ["id", "userId"],
          include: [
            {
              model: users,
              attributes: ["id", "fullName"],
            },
          ],
        },
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

const updateShopifyAccountUser = async (params, body) => {
  try {
    const isAccountExist = await shopifyAccounts.findOne({
      where: {
        id: params?.accountId,
      },
    });
    if (isAccountExist) {
      const data = {
        vendorId: body?.vendorId,
        apiURL: body?.apiURL,
        accessToken: body?.accessToken,
      };
      const result = await isAccountExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Shopify account updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Shopify account not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteShopifyAccountUser = async (params) => {
  try {
    const isAccountExist = await shopifyAccounts.findOne({
      where: {
        id: params?.accountId,
      },
    });
    if (isAccountExist) {
      const result = await isAccountExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Shopify account deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Shopify account not found!"
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
  addShopifyAccountUser,
  getShopifyAccountsUser,
  updateShopifyAccountUser,
  deleteShopifyAccountUser,
};
