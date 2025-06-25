const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const reviews = sequelize.define("reviews", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT, allowNull: true },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("reviews table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = reviews;
