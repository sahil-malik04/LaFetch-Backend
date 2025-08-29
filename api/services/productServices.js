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
const shopifyAccounts = require("../models/shopifyAccountsModel");
const productCollection = require("../models/productCollectionModel");
const { Op } = require("sequelize");
const { sequelize } = require("../db/dbConfig");
const users = require("../models/userModel");

// products
const getProductsUser = async (query) => {
  try {
    const genderParam = Number(query.gender);
    const catId = Number(query.catId);
    const status = Number(query?.status);
    const id = Number(query?.of);

    const whereClause = {
      ...(query?.status && { status: status === 1 ? true : false }),
    };

    if (genderParam) {
      whereClause.superCatId = genderParam;
    }
    if (catId) {
      whereClause.catId = catId;
    }
    if (id) {
      whereClause.addedBy = id;
    }

    const result = await products.findAll({
      where: whereClause,
      include: [
        {
          model: users,
          attributes: ["id","fullName"], 
          required: false,
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

const getProductByIdUser = async (params) => {
  try {
    const product = await products.findOne({
      where: {
        id: params?.productId,
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

const updateProductUser = async (params, body, reqFiles) => {
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
        shortDescription: body?.shortDescription,
        description: body?.description,
        slug: body?.slug,
        tags: JSON.parse(body?.tags),

        superCatId: body?.superCatId,
        catId: body?.catId,
        subCatId: body?.subCatId,
        brandId: body?.brandId,
        warehouseId: body?.warehouseId,

        isFeatured: body?.isFeatured,

        sku: body?.sku,
        lfSku: body?.lfSku,

        seoTitle: body?.seoTitle,
        seoDescription: body?.seoDescription,

        targetGenders: JSON.parse(body?.targetGenders),
        fabrics: JSON.parse(body?.fabrics),
        colorPatterns: JSON.parse(body?.colorPatterns),

        basePrice: body?.basePrice,
        hasCOD: body?.hasCOD,
        hasExchange: body?.hasExchange,
        exchangeDays: body?.exchangeDays,
        manufacturingAmount: body?.manufacturingAmount,
        mrp: body?.mrp,
        msp: body?.msp,
        lfMsp: body?.lfMsp,
        sellingAmount: body?.sellingAmount,
        netAmount: body?.netAmount,
        collectionID: body?.collectionID,
        updatedAt: new Date(),
      };
      // Handle multiple image uploads
      if (reqFiles?.image && reqFiles.image.length > 0) {
        const urls = [];
        for (const image of reqFiles.image) {
          const url = await uploadToS3(
            image.buffer,
            image.originalname,
            image.mimetype,
            "product-assets"
          );
          urls.push(url);
        }

        data.imageUrls = urls;
      }
      const result = await isProductExist.update(data);
      const variants = JSON.parse(body?.variants);
      if (variants.length) {
        let lowestPrice = Number.POSITIVE_INFINITY;
        for (const variantEdge of variants) {
          const price = parseFloat(variantEdge.price);

          if (price && price < lowestPrice) {
            lowestPrice = price;
          }

          await productVariants.create({
            productId: result.id,
            title: variantEdge.title,
            sku: variantEdge.sku,
            price: price,
            compareAtPrice: parseFloat(variantEdge.compareAtPrice),
            inventoryQuantity: variantEdge.inventoryQuantity,
            selectedOptions: variantEdge.selectedOptions,
          });
        }

        if (lowestPrice !== Number.POSITIVE_INFINITY) {
          await result.update({ basePrice: lowestPrice });
        }
      }
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

const updateProductStatusUser = async (params) => {
  try {
    const isProductExist = await products.findOne({
      where: {
        id: params?.productId,
      },
    });
    if (isProductExist) {
      const data = {
        status: true,
        updatedAt: new Date(),
      };
      const result = await isProductExist.update(data);
      if (result)
        return successResponse(
          statusCode.SUCCESS.OK,
          "Product updated successfully!"
        );
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

const onboardProductUser = async (body, reqFiles) => {
  try {
    const data = {
      type: body?.type,
      title: body?.title,
      shortDescription: body?.shortDescription,
      description: body?.description,
      slug: body?.slug,
      tags: JSON.parse(body?.tags),

      superCatId: body?.superCatId,
      catId: body?.catId,
      subCatId: body?.subCatId,
      brandId: body?.brandId,
      warehouseId: body?.warehouseId,

      isFeatured: body?.isFeatured,

      sku: body?.sku,
      lfSku: body?.lfSku,

      seoTitle: body?.seoTitle,
      seoDescription: body?.seoDescription,

      targetGenders: JSON.parse(body?.targetGenders),
      fabrics: JSON.parse(body?.fabrics),
      colorPatterns: JSON.parse(body?.colorPatterns),

      publishedAt: new Date().toISOString().split(".")[0] + "Z",
      addedFrom: "admin",
      addedBy: body?.addedBy,
      collectionID: body?.collectionID,
      basePrice: body?.basePrice,
      hasCOD: body?.hasCOD,
      hasExchange: body?.hasExchange,
      exchangeDays: body?.exchangeDays,
      manufacturingAmount: body?.manufacturingAmount,
      mrp: body?.mrp,
      msp: body?.msp,
      lfMsp: body?.lfMsp,
      sellingAmount: body?.sellingAmount,
      netAmount: body?.netAmount,
    };
    // Handle multiple image uploads
    if (reqFiles?.image && reqFiles.image.length > 0) {
      const urls = [];
      for (const image of reqFiles.image) {
        const url = await uploadToS3(
          image.buffer,
          image.originalname,
          image.mimetype,
          "product-assets"
        );
        urls.push(url);
      }

      data.imageUrls = urls;
    }
    const result = await products.create(data);
    if (result) {
      let lowestPrice = Number.POSITIVE_INFINITY;
      const variants = JSON.parse(body?.variants);
      for (const variantEdge of variants) {
        const price = parseFloat(variantEdge.price);

        if (price && price < lowestPrice) {
          lowestPrice = price;
        }

        await productVariants.create({
          productId: result.id,
          title: variantEdge.title,
          sku: variantEdge.sku,
          price: price,
          compareAtPrice: parseFloat(variantEdge.compareAtPrice),
          inventoryQuantity: variantEdge.inventoryQuantity,
          selectedOptions: variantEdge.selectedOptions,
        });
      }

      if (lowestPrice !== Number.POSITIVE_INFINITY) {
        await result.update({ basePrice: lowestPrice });
      }
    }
    return successResponse(
      statusCode.SUCCESS.CREATED,
      "Product added successfully!"
    );
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateProductVariantUser = async (params, body) => {
  try {
    const isVariantExist = await productVariants.findOne({
      where: {
        id: params?.variantId,
      },
    });
    if (isVariantExist) {
      const data = {
        title: body?.title,
        sku: body?.sku,
        price: body?.price,
        compareAtPrice: body?.compareAtPrice,
        inventoryQuantity: body?.inventoryQuantity,
        selectedOptions: body?.selectedOptions,
        updatedAt: new Date(),
      };
      const result = await isVariantExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Product variant updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Product variant doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteProductVariantUser = async (params) => {
  try {
    const isVariantExist = await productVariants.findOne({
      where: {
        id: params?.variantId,
      },
    });
    if (isVariantExist) {
      const deleteVariant = await isVariantExist.destroy();
      if (deleteVariant) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Product variant deleted successfully!"
        );
      }
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

const deleteProductUser = async (params) => {
  try {
    const deletedVariants = await productVariants.destroy({
      where: {
        productId: params?.productId,
      },
    });
    if (deletedVariants > 0) {
      const deleteProduct = await products.destroy({
        where: {
          id: params?.productId,
        },
      });
      if (deleteProduct) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Product deleted successfully!"
        );
      }
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
      include: [
        {
          model: brands,
          attributes: ["id", "name"],
        },
        {
          model: category,
          attributes: ["id", "name"],
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
      if (Object.keys(reqFiles).length) {
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
        if (Object.keys(reqFiles).length) {
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

const syncProductsUser = async (query) => {
  try {
    if (query?.vendorId) {
      const getShopifyCred = await shopifyAccounts.findOne({
        where: {
          vendorId: query?.vendorId,
        },
      });
      if (getShopifyCred) {
        const SHOPIFY_API_URL = getShopifyCred?.apiURL;
        const ACCESS_TOKEN = getShopifyCred?.accessToken;

        const result = await syncShopifyProducts(SHOPIFY_API_URL, ACCESS_TOKEN, query?.vendorId);

        return successResponse(result?.status, result?.message);
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.NOT_FOUND,
          "No shopify account linked with the vendor"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Please provide vendor ID"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getSizeChartsUser = async (query) => {
  try {
    const id = Number(query?.of);
    const whereClause = {
      ...(id && { addedBy: id }),
    };
    const result = await productSizeCharts.findAll({
      where: whereClause,
      include: [
        {
          model: brands,
          attributes: ["id", "name"],
        },
        {
          model: category,
          as: "superCategory",
          attributes: ["id", "name"],
        },
        {
          model: category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: category,
          as: "subCategory",
          attributes: ["id", "name"],
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
        addedBy: payload?.addedBy,
      };
      if (Object.keys(reqFiles).length) {
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
      }
      const result = await productSizeCharts.create(data);
      if (result) {
        return successResponse(statusCode.SUCCESS.OK, "Success!", result);
      }
    }
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
      if (Object.keys(reqFiles).length) {
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
      }
      const result = await isSizeChartExist.update(data);
      if (result) {
        return successResponse(statusCode.SUCCESS.OK, "Success!", result);
      }
    }
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

const getSizeChartByIdUser = async (params) => {
  try {
    const result = await productSizeCharts.findOne({
      where: {
        id: params?.sizeChartId,
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

const getProductCollectionsUser = async () => {
  try {
    const result = await productCollection.findAll();
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addProductCollectionUser = async (payload, reqFiles) => {
  try {
    const isCollectionExist = await productCollection.findOne({
      where: {
        name: payload?.name,
      },
    });
    if (isCollectionExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Product collection already exist with same name"
      );
    } else {
      const data = {
        name: payload?.name,
        desc: payload?.desc,
      };
      const result = await productCollection.create(data);
      if (result) {
        return successResponse(statusCode.SUCCESS.OK, "Success!", result);
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateProductCollectionUser = async (params, payload) => {
  try {
    const isCollectionExist = await productCollection.findOne({
      where: {
        id: params?.collectionId,
      },
    });
    if (!isCollectionExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Product collection doesn't exist"
      );
    } else {
      if (payload?.name && payload?.name !== isCollectionExist.title) {
        const isNameTaken = await productCollection.findOne({
          where: {
            name: payload.name,
            id: { [Op.ne]: params?.collectionId },
          },
        });
        if (isNameTaken) {
          return rejectResponse(
            statusCode.CLIENT_ERROR.CONFLICT,
            "Collection name already in use!"
          );
        }
      }
      const data = {
        name: payload?.name,
        desc: payload?.desc,
        updatedAt: new Date(),
      };

      const result = await isCollectionExist.update(data);
      if (result) {
        return successResponse(statusCode.SUCCESS.OK, "Success!", result);
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteProductCollectionUser = async (params) => {
  try {
    const isCollectionExist = await productCollection.findOne({
      where: {
        id: params?.collectionId,
      },
    });
    if (isCollectionExist) {
      const result = await isCollectionExist.destroy();
      if (result)
        return successResponse(
          statusCode.SUCCESS.OK,
          "Collection deleted successfully!"
        );
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Product collection doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getCollectionWithProductsUser = async () => {
  try {
    const getAllCollections = await productCollection.findAll({
      include: [
        {
          model: products,
          as: "products",
          required: false,
        },
      ],
    });
    return successResponse(
      statusCode.SUCCESS.OK,
      "Success!",
      getAllCollections
    );
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const productSearchUser = async (query) => {
  try {
    const search = query?.key;
    if (!search || search.trim() === "") {
      return rejectResponse(
        statusCode.CLIENT_ERROR.BAD_REQUEST,
        "Search term is required!"
      );
    }
    const result = await products.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } }, // case-insensitive
          // { description: { [Op.iLike]: `%${search}%` } },
          // { sku: { [Op.iLike]: `%${search}%` } },
          { tags: { [Op.contains]: [search] } },
        ],
        status: true,
      },
      order: [["createdAt", "DESC"]],
    });
    return successResponse(
      statusCode.SUCCESS.OK,
      "Products fetched successfully!",
      result
    );
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const productSuggestionUser = async (query) => {
  try {
    const search = query?.key;

    if (!search || search.trim() === "") {
      return rejectResponse(
        res,
        statusCode.CLIENT_ERROR.BAD_REQUEST,
        "Search term is required!"
      );
    }

    const result = await products.findAll({
      attributes: [
        //  title + tags
        "title",
        "tags",
      ],
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          sequelize.where(
            sequelize.literal(
              `EXISTS (SELECT 1 FROM unnest("products"."tags") AS tag WHERE tag ILIKE '%${search}%')`
            ),
            true
          ),
        ],
        status: true,
      },
      limit: 10,
    });

    // Extract keywords from results
    let suggestions = [];

    result.forEach((item) => {
      if (
        item.title &&
        item.title.toLowerCase().includes(search.toLowerCase())
      ) {
        suggestions.push(item.title);
      }
      if (item.tags && item.tags.length > 0) {
        item.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(search.toLowerCase())) {
            suggestions.push(tag);
          }
        });
      }
    });

    // Deduplicate
    suggestions = [...new Set(suggestions)];

    return successResponse(
      statusCode.SUCCESS.OK,
      "Suggestions fetched successfully!",
      suggestions
    );
  } catch (error) {
    return rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      "Something went wrong!"
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
  getSizeChartByIdUser,
  updateProductStatusUser,
  deleteProductUser,
  onboardProductUser,
  updateProductVariantUser,
  deleteProductVariantUser,
  getProductCollectionsUser,
  addProductCollectionUser,
  updateProductCollectionUser,
  deleteProductCollectionUser,
  getCollectionWithProductsUser,
  productSearchUser,
  productSuggestionUser,
};
