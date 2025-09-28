const axios = require("axios");

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

async function callShopifyGraphQL(SHOPIFY_API_URL, ACCESS_TOKEN) {
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

    return response.data.data.products;
  } catch (error) {
    return error;
  }
}

module.exports = {
  callShopifyGraphQL,
};
