const axios = require("axios");

const SHOPIFY_API_URL =
  "https://backend-testbuild-store.myshopify.com/admin/api/2025-04/graphql.json";
const ACCESS_TOKEN = "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";

const fetchProductQuery = `
    {
      locations(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
      products(first: 10) {
        edges {
          node {
        id
        title
        handle
        description
        descriptionHtml
        productType
        status
        tags
        totalInventory
        vendor
        createdAt
        updatedAt
        publishedAt
                metafield(namespace: "shopify", key: "target-gender") {
          type
          references(first: 10) {
            edges {
              node {
                ... on Metaobject {
                  id
                  type
                  fields {
                    key
                    value
                  }
                }
              }
            }
          }
        }
                seo {
          title
          description
        }
        options {
          id
          name
          values
        }
            variants(first: 10) {
              edges {
                node {
                             id
              title
              sku
              price
              compareAtPrice
              inventoryQuantity
                  inventoryItem {
                    id
                    inventoryLevels(first: 10) {
                      edges {
                        node {
                          
                          location {
                            id
                            name
                          }
                        }
                      }
                    }
                  }
                        selectedOptions {
                name
                value
              }
                }
              }
            }
                     images(first: 10) {
          edges {
            node {
              id
              altText
              originalSrc
              width
              height
            }
          }
        }
          }
        }
      }
    }
  `;

async function callShopifyGraphQL() {
  try {
    const response = await axios.post(
      SHOPIFY_API_URL,
      { query: fetchProductQuery },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": ACCESS_TOKEN,
        },
      }
    );

    return (response.data.data.products);
  } catch (error) {
    console.error("Error calling Shopify API:", error);
  }
}

module.exports = {
  callShopifyGraphQL,
};
