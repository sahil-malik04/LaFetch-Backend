const { successResponse, rejectResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");
const products = require("../models/productsModel");
const { syncShopifyProducts } = require("../shopify/shopifyDBSync");
const brands = require("../models/brandsModel");
const category = require("../models/categoryModel");
const warehouse = require("../models/warehouseModel");
const { responseMessages } = require("../utils/dataUtils");
const banners = require("../models/bannerModel");
const productVariants = require("../models/productVariantModel");
const { Op } = require("sequelize");
const { identifyGender } = require("../utils/commonFunc");

// products
const getProductsUser = async (query) => {
  try {
    const genderParam = query.gender;
    const collectionType = query.collectionType;

    const whereClause = {
      status: "ACTIVE",
    };
    let genderFilter;
    if (genderParam === "1") {
      genderFilter = "Male";
    } else if (genderParam === "2") {
      genderFilter = "Female";
    } else if (genderParam === "3") {
      genderFilter = "Accessories";
    }
    if (genderFilter) {
      whereClause.targetGenders = {
        [Op.eq]: [genderFilter],
      };
    }
    if (collectionType) {
      whereClause.collectionType = collectionType;
    }

    const result = await products.findAll({
      where: whereClause,
      attributes: [
        "id",
        "title",
        "description",
        "imageUrls",
        "isFeatured",
        "rating",
        "basePrice",
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

const getProductByIdUser = async (params) => {
  try {
    const product = await products.findOne({
      where: {
        id: params?.productId,
        status: "ACTIVE",
      },
      include: [brands, category, warehouse],
    });
    if (product) {
      const variants = await productVariants.findAll({
        where: { productId: product.id },
      });
      const result = {
        ...product.toJSON(),
        variants,
      };

      return successResponse(statusCode.SUCCESS.OK, "Success!", result);
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        responseMessages.PRODUCT_NOT_EXIST
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateProductUser = async (params, body) => {
  try {
    const isProductExist = await products.findOne({
      where: {
        id: params?.productId,
      },
    });
    if (isProductExist) {
      const data = {
        type: body?.type,
        title: body?.title,
        description: body?.description,
        tags: body?.tags,

        categoryId: body?.categoryId,
        brandId: body?.brandId,
        warehouseId: body?.warehouseId,

        seoTitle: body?.seoTitle,
        seoDescription: body?.seoDescription,

        targetGenders: body?.targetGenders,
        fabrics: body?.fabrics,
        colorPatterns: body?.colorPatterns,

        hasCOD: body?.hasCOD,
        hasExchange: body?.hasExchange,
        exchangeDays: body?.exchangeDays,
        manufacturingAmount: body?.manufacturingAmount,
        sellingAmount: body?.sellingAmount,
        netAmount: body?.netAmount,
      };
      const result = await isProductExist.update(data);
      return successResponse(statusCode.SUCCESS.OK, "Success!", result);
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        responseMessages.PRODUCT_NOT_EXIST
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

// banner
const getBannersUser = async (query) => {
  try {
    const genderParam = query.gender;

    const genderFilter = identifyGender(genderParam);
    let whereClause = {};
    if (genderFilter) {
      whereClause.genderType = genderFilter;
    }
    const result = await banners.findAll({
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

const addBannerUser = async (payload) => {
  try {
    const { image, title, genderType, brandId } = payload;
    const data = {
      image,
      title,
      genderType,
      brandId,
    };
    const result = await banners.create(data);
    return successResponse(statusCode.SUCCESS.CREATED, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateBannerUser = async (params, payload) => {
  try {
    const isBannerExist = await banners.findOne({
      where: {
        id: params.bannerId,
      },
    });
    if (isBannerExist) {
      const { image, title } = payload;
      const data = {
        image,
        title,
      };
      const result = await isBannerExist.update(data);
      return successResponse(statusCode.SUCCESS.OK, "Success!", result);
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        responseMessages.BANNER_NOT_EXIST
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteBannerUser = async (params) => {
  try {
    const isBannerExist = await banners.findOne({
      where: {
        id: params.bannerId,
      },
    });
    if (isBannerExist) {
      const result = await isBannerExist.destroy();
      if (result) return successResponse(statusCode.SUCCESS.OK, "Success!");
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        responseMessages.BANNER_NOT_EXIST
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getCategoriesUser = async (query) => {
  try {
    const genderParam = query.gender;

    const genderFilter = identifyGender(genderParam);
    let whereClause = {};
    if (genderFilter) {
      whereClause.genderType = genderFilter;
    }
    const result = await category.findAll({
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

module.exports = {
  getProductsUser,
  getProductByIdUser,
  updateProductUser,
  getBannersUser,
  addBannerUser,
  updateBannerUser,
  deleteBannerUser,
  getCategoriesUser,
};
