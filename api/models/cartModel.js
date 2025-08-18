const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const users = require("./userModel.js");
const products = require("./productsModel.js");
const productVariants = require("./productVariantModel.js");

const cart = sequelize.define("cart", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  userId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  variantId: { type: DataTypes.INTEGER, allowNull: true },
  
  status: {
    type: DataTypes.ENUM("active", "ordered", "removed"),
    defaultValue: "active",
  },
});

cart.belongsTo(users, { foreignKey: "userId" });
cart.belongsTo(products, { foreignKey: "productId" });
cart.belongsTo(productVariants, { foreignKey: "variantId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("cart table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = cart;
