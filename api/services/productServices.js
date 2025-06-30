const { successResponse, rejectResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");
const products = require("../models/productsModel");
const brands = require("../models/brandsModel");
const category = require("../models/categoryModel");
const warehouse = require("../models/warehouseModel");
const { responseMessages } = require("../utils/dataUtils");
const banners = require("../models/bannerModel");
const productVariants = require("../models/productVariantModel");

// products
const getProductsUser = async (query) => {
  try {
    const genderParam = Number(query.gender);
    const collectionType = query.collectionType;

    const whereClause = {
      status: "ACTIVE",
    };

    if (collectionType) {
      whereClause.collectionType = collectionType;
    }
    if (genderParam) {
      whereClause.superCatId = genderParam;
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

        superCatId: body?.superCatId,
        catId: body?.catId,
        subCatId: body?.subCatId,
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
    const genderParam = Number(query.gender);

    const result = await banners.findAll({
      where: {
        categoryId: genderParam,
      },
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
    const { image, title, categoryId, brandId } = payload;
    if (categoryId > 3 || categoryId < 1) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Category can be either men, women or accessories"
      );
    } else {
      const data = {
        image,
        title,
        categoryId,
        brandId,
      };
      const result = await banners.create(data);
      return successResponse(statusCode.SUCCESS.CREATED, "Success!", result);
    }
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
      const { image, title, categoryId, brandId } = payload;
      if (categoryId > 3 || categoryId < 1) {
        return rejectResponse(
          statusCode.CLIENT_ERROR.CONFLICT,
          "Category can be either men, women or accessories"
        );
      } else {
        const data = {
          image,
          title,
          categoryId,
          brandId,
        };
        const result = await isBannerExist.update(data);
        return successResponse(statusCode.SUCCESS.OK, "Success!", result);
      }
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

module.exports = {
  getProductsUser,
  getProductByIdUser,
  updateProductUser,
  getBannersUser,
  addBannerUser,
  updateBannerUser,
  deleteBannerUser,
};
