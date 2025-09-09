const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const banners = require("./bannerModel.js");
const products = require("./productsModel.js");

const banner_products = sequelize.define("banner_products", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bannerId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  sortOrder: { type: DataTypes.INTEGER, allowNull: true }, // optional
});

banners.belongsToMany(products, { through: banner_products, foreignKey: "bannerId" });
products.belongsToMany(banners, { through: banner_products, foreignKey: "productId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("banner_products table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = banner_products;