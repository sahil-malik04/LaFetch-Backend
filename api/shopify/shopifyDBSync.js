const { callShopifyGraphQL } = require("./callShopifyGraphQL");
const products = require("../models/productsModel");
const productVariants = require("../models/productVariantModel");
const { statusCode } = require("../utils/statusCode");
const { rejectResponse, successResponse } = require("../utils/response");
const inventories = require("../models/inventoriesModel");

async function syncShopifyProducts(SHOPIFY_API_URL, ACCESS_TOKEN) {
  try {
    const result = await callShopifyGraphQL(SHOPIFY_API_URL, ACCESS_TOKEN);
    if (result?.edges) {
      const productsDataResult = result?.edges || [];

      for (const edge of productsDataResult) {
        const node = edge.node;
        let productRecord = await products.findOne({
          where: { shopifyProductId: node.id },
        });

        if (!productRecord) {
          const genderLabels =
            node.metafield?.references?.edges?.map(
              (e) => e.node.fields.find((f) => f.key === "label")?.value
            ) || [];

          const colorOptions =
            node.options.find((opt) => opt.name === "Color")?.values || [];
          const fabricOptions =
            node.options.find((opt) => opt.name === "Fabric")?.values || [];

          const productPayload = {
            type: node.productType,
            title: node.title,
            description: node.description,
            tags: node.tags || [],
            publishedAt:
              node.publishedAt || new Date().toISOString().split(".")[0] + "Z",
            imageUrls:
              node.images?.edges?.map((img) => img.node.originalSrc) || [],

            shopifyProductId: node.id,
            shopifyHandle: node.handle,
            shopifyCreatedAt: node.createdAt,
            shopifyUpdatedAt: node.updatedAt,

            mrp: parseFloat(variant.compareAtPrice),

            seoTitle: node.seo?.title || null,
            seoDescription: node.seo?.description || null,

            targetGenders: genderLabels,
            fabrics: fabricOptions,
            colorPatterns: colorOptions,
            addedFrom: "shopify",
            hasCOD: true,
            hasExchange: true,
            exchangeDays: 2,
            manufacturingAmount: 10.6,
            sellingAmount: 12.5,
            netAmount: 9.0,
          };
          productRecord = await products.create(productPayload);
        }

        let lowestPrice = Number.POSITIVE_INFINITY;

        for (const variantEdge of node.variants.edges) {
          const variant = variantEdge.node;
          const price = parseFloat(variant.price);

          if (price && price < lowestPrice) {
            lowestPrice = price;
          }

          let existingVariant = await productVariants.findOne({
            where: { shopifyVariantId: variant.id },
          });

          let variantData = {
            title: variant.title,
            sku: variant.sku,
            price: price,
            selectedOptions: variant.selectedOptions,
          };

          if (!existingVariant) {
            existingVariant = await productVariants.create({
              ...variantData,
              productId: productRecord.id,
              shopifyVariantId: variant.id,
            });
          } else {
            await existingVariant.update(variantData);
          }

          // Upsert inventory
          let existingInventory = await inventories.findOne({
            where: { variantId: existingVariant.id },
          });

          let inventoryData = {
            availableStock: variant.inventoryQuantity,
            lastSyncedAt: new Date(),
          };

          if (!existingInventory) {
            await inventories.create({
              variantId: existingVariant.id,
              ...inventoryData,
            });
          } else {
            await existingInventory.update(inventoryData);
          }
        }

        if (lowestPrice !== Number.POSITIVE_INFINITY) {
          await productRecord.update({ basePrice: lowestPrice });
        }
      }
      return successResponse(statusCode.SUCCESS.OK, "Product Sync success!");
    } else {
      return rejectResponse(statusCode.CLIENT_ERROR.CONFLICT, result);
    }
  } catch (error) {
    throw rejectResponse(
      statusCode.CLIENT_ERROR.CONFLICT,
      error.response?.data || error.message
    );
  }
}

module.exports = {
  syncShopifyProducts,
};
