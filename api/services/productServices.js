const { successResponse, rejectResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");
const products = require("../models/productsModel");
const brands = require("../models/brandsModel");
const category = require("../models/categoryModel");
const warehouse = require("../models/warehouseModel");
const { responseMessages } = require("../utils/dataUtils");
const banners = require("../models/bannerModel");
const productVariants = require("../models/productVariantModel");
const { syncShopifyProducts } = require("../shopify/shopifyDBSync");
const { uploadToS3 } = require("../utils/s3Uploader");
const productSizeCharts = require("../models/productSizeChartsModel");

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
    const categoryId = Number(query.gender);
    const whereClause = {};

    if (!isNaN(categoryId)) {
      whereClause.categoryId = categoryId;
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

const getBannerByIdUser = async (params) => {
  try {
    const result = await banners.findOne({
      where: {
        id: params?.bannerId,
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

const addBannerUser = async (payload, reqFiles) => {
  try {
    const { title, categoryId, brandId } = payload;
    if (categoryId > 3 || categoryId < 1) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Category can be either men, women or accessories"
      );
    } else {
      const data = {
        title,
        categoryId,
        brandId,
      };
      const image = reqFiles?.image[0];
      if (image) {
        const url = await uploadToS3(
          image.buffer,
          image.originalname,
          image.mimetype,
          "banner-assets"
        );
        data.image = url;
      }

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

const updateBannerUser = async (params, payload, reqFiles) => {
  try {
    const isBannerExist = await banners.findOne({
      where: {
        id: params.bannerId,
      },
    });
    if (isBannerExist) {
      const { title, categoryId, brandId } = payload;
      if (categoryId > 3 || categoryId < 1) {
        return rejectResponse(
          statusCode.CLIENT_ERROR.CONFLICT,
          "Category can be either men, women or accessories"
        );
      } else {
        const data = {
          title,
          categoryId,
          brandId,
        };
        const image = reqFiles?.image[0];
        if (image) {
          const url = await uploadToS3(
            image.buffer,
            image.originalname,
            image.mimetype,
            "banner-assets"
          );
          data.image = url;
        }

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

const syncProductsUser = async () => {
  try {
    await syncShopifyProducts();
    return successResponse(statusCode.SUCCESS.OK, "Shopify sync complete!");
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getSizeChartsUser = async () => {
  try {
    const result = await productSizeCharts.findAll();
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addSizeChartUser = async (payload, reqFiles) => {
  try {
    const isSizeChartExist = await productSizeCharts.findOne({
      where: {
        title: payload?.title,
      },
    });
    if (isSizeChartExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Size chart already exist with same title"
      );
    } else {
      const data = {
        title: payload?.title,
        brandId: payload?.brandId,
        superCatId: payload?.superCatId,
        catId: payload?.catId,
        subCatId: payload?.subCatId,
        sizeChartData: payload?.sizeChartData,
      };
      const image = reqFiles?.sizeGuideImage[0];
      if (image) {
        const url = await uploadToS3(
          image.buffer,
          image.originalname,
          image.mimetype,
          "size-chart-assets"
        );
        data.sizeGuideImage = url;
      }
      const result = await productSizeCharts.create(data);
      if (result) {
        return successResponse(statusCode.SUCCESS.OK, "Success!", result);
      }
    }
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateSizeChartUser = async (params, payload, reqFiles) => {
  try {
    const isSizeChartExist = await productSizeCharts.findOne({
      where: {
        id: params?.sizeChartId,
      },
    });
    if (!isSizeChartExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Size chart doesn't exist"
      );
    } else {
      if (payload?.title && payload?.title !== isSizeChartExist.title) {
        const isTitleTaken = await productSizeCharts.findOne({
          where: { title: payload.title },
        });
        if (isTitleTaken) {
          return rejectResponse(
            statusCode.CLIENT_ERROR.CONFLICT,
            "Title already in use"
          );
        }
      }
      const data = {
        title: payload?.title,
        brandId: payload?.brandId,
        superCatId: payload?.superCatId,
        catId: payload?.catId,
        subCatId: payload?.subCatId,
        sizeChartData: payload?.sizeChartData,
      };
      const image = reqFiles?.sizeGuideImage[0];
      if (image) {
        const url = await uploadToS3(
          image.buffer,
          image.originalname,
          image.mimetype,
          "size-chart-assets"
        );
        data.sizeGuideImage = url;
      }
      const result = await isSizeChartExist.update(data);
      if (result) {
        return successResponse(statusCode.SUCCESS.OK, "Success!", result);
      }
    }
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteSizeChartUser = async (params) => {
  try {
    const isSizeChartExist = await productSizeCharts.findOne({
      where: {
        id: params?.sizeChartId,
      },
    });
    if (isSizeChartExist) {
      const result = await isSizeChartExist.destroy();
      if (result) return successResponse(statusCode.SUCCESS.OK, "Success!");
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Size chart doesn't exist"
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
  getBannerByIdUser,
  addBannerUser,
  updateBannerUser,
  deleteBannerUser,
  syncProductsUser,
  getSizeChartsUser,
  addSizeChartUser,
  updateSizeChartUser,
  deleteSizeChartUser,
};
