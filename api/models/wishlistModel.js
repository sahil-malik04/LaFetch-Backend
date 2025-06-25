const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const users = require("./userModel.js");
const products = require("./productsModel.js");
const wishlistBoards = require("./wishlistBoardsModel.js");

const wishlist = sequelize.define("wishlist", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  boardId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
});

wishlist.belongsTo(users, { foreignKey: "userId" });
wishlist.belongsTo(wishlistBoards, { foreignKey: "boardId" });
wishlist.belongsTo(products, { foreignKey: "productId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("wishlist table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = wishlist;
