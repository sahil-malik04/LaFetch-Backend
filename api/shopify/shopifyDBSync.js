const { callShopifyGraphQL } = require("./callShopifyGraphQL");
const products = require("../models/productsModel");
const productVariants = require("../models/productVariantModel");
const { statusCode } = require("../utils/statusCode");
const { rejectResponse, successResponse } = require("../utils/response");

async function syncShopifyProducts(SHOPIFY_API_URL, ACCESS_TOKEN) {
  try {
    const result = await callShopifyGraphQL(SHOPIFY_API_URL, ACCESS_TOKEN);
    if (result?.edges) {
      const productsDataResult = result?.edges || [];

      for (const edge of productsDataResult) {
        const node = edge.node;

        const existingProduct = await products.findOne({
          where: { shopifyProductId: node.id },
        });
        if (existingProduct) {
          continue;
        }

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
          status: node.status,
          tags: node.tags || [],
          publishedAt: node.publishedAt,
          imageUrls:
            node.images?.edges?.map((img) => img.node.originalSrc) || [],

          shopifyProductId: node.id,
          shopifyHandle: node.handle,
          shopifyCreatedAt: node.createdAt,
          shopifyUpdatedAt: node.updatedAt,

          seoTitle: node.seo?.title || null,
          seoDescription: node.seo?.description || null,

          targetGenders: genderLabels,
          fabrics: fabricOptions,
          colorPatterns: colorOptions,
          addedBy: "shopify",
          hasCOD: true,
          hasExchange: true,
          exchangeDays: 2,
          manufacturingAmount: 10.6,
          sellingAmount: 12.5,
          netAmount: 9.0,
        };

        const createdProduct = await products.create(productPayload);

        let lowestPrice = Number.POSITIVE_INFINITY;

        for (const variantEdge of node.variants.edges) {
          const variant = variantEdge.node;
          const price = parseFloat(variant.price);

          if (price && price < lowestPrice) {
            lowestPrice = price;
          }

          await productVariants.create({
            productId: createdProduct.id,
            shopifyVariantId: variant.id,
            title: variant.title,
            sku: variant.sku,
            price: price,
            compareAtPrice: parseFloat(variant.compareAtPrice),
            inventoryQuantity: variant.inventoryQuantity,
            selectedOptions: variant.selectedOptions,
          });
        }

        if (lowestPrice !== Number.POSITIVE_INFINITY) {
          await createdProduct.update({ basePrice: lowestPrice });
        }
      }
      return successResponse(statusCode.SUCCESS.OK, "Product Sync success!");
    } else {
      return rejectResponse(statusCode.CLIENT_ERROR.CONFLICT, result);
    }
  } catch (error) {
    console.error("Shopify sync error:", error.response?.data || error.message);
  }
}

module.exports = {
  syncShopifyProducts,
};
