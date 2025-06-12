const { successResponse, rejectResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");
const brands = require("../models/brandsModel");
const products = require("../models/productsModel");

const getBrandsUser = async (query) => {
  try {
    const whereClause = {
      isFeatured: query.isFeatured === "true" ? true : false,
    };

    const result = await brands.findAll({
      where: whereClause,
    });

    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getProductsByBrandUser = async (params) => {
  try {
    const brandInfo = await brands.findOne({
      where: { id: params?.brandId },
    });

    const productList = await products.findAll({
      where: { brandId: params?.brandId },
    });

    return successResponse(statusCode.SUCCESS.OK, "Success!", {
      brandInfo,
      products: productList,
    });
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = {
  getBrandsUser,
  getProductsByBrandUser,
};
