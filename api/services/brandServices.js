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

const viewBrandUser = async (params) => {
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

const makeBrandFeaturedUser = async (params, query) => {
  try {
    const featured = query?.featured;
    if (featured !== "true" && featured !== "false") {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "query param must be boolean!"
      );
    }
    const isBrandExist = await brands.findOne({
      where: { id: params?.brandId },
    });
    if (isBrandExist) {
      const result = await isBrandExist.update({
        isFeatured: featured === "true",
      });

      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Brand updated successfully!!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Brand not found!"
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
  getBrandsUser,
  viewBrandUser,
  makeBrandFeaturedUser,
};
