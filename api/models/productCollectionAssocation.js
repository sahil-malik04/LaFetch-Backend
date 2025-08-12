const productCollection = require("./productCollectionModel");
const products = require("./productsModel");

const associateProductCollection = () => {
  // One collection can have many products
  productCollection.hasMany(products, {
    foreignKey: "collectionID",
    as: "products",
  });

  // Each product belongs to one collection
  products.belongsTo(productCollection, {
    foreignKey: "collectionID",
    as: "collection",
  });
};

module.exports = associateProductCollection;
