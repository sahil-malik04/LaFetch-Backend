const inventories = require("./inventoriesModel");
const products = require("./productsModel");
const productVariants = require("./productVariantModel");
const warehouse = require("./warehouseModel");

const associateInventoryVariant = () => {
  inventories.belongsTo(productVariants, { foreignKey: "variantId" });
  inventories.belongsTo(warehouse, { foreignKey: "warehouseId" });

  productVariants.belongsTo(products, { foreignKey: "productId" });
  productVariants.hasOne(inventories, { foreignKey: "variantId" });
};

module.exports = associateInventoryVariant;
