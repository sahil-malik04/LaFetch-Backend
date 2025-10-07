const productCollection = require("./productCollectionModel");
const products = require("./productsModel");
const vendors = require("./vendorsModel");

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

  productCollection.belongsTo(vendors, {
    foreignKey: "vendorId",
    as: "vendor",
  });
};

module.exports = associateProductCollection;
