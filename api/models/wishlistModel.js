const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const wishlist = sequelize.define("wishlist", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  boardId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  productVariantId: { type: DataTypes.INTEGER, allowNull: false },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("wishlist table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = wishlist;
