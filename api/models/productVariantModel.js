const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const products = require("./productsModel.js");

const productVariants = sequelize.define("product_variants", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  shopifyVariantId: { type: DataTypes.STRING, allowNull: true },
  title: { type: DataTypes.STRING },
  sku: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
  compareAtPrice: { type: DataTypes.FLOAT },
  inventoryQuantity: { type: DataTypes.INTEGER },
  selectedOptions: { type: DataTypes.JSONB }, // [{ name: "Color", value: "Red" }]
});

productVariants.belongsTo(products, { foreignKey: "productId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("product_variants table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = productVariants;
