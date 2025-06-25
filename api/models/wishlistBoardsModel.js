const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const users = require("./userModel.js");

const wishlistBoards = sequelize.define("wishlist_boards", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
});

wishlistBoards.belongsTo(users, { foreignKey: "userId" });
users.hasMany(wishlistBoards, { foreignKey: "userId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("wishlistBoards table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = wishlistBoards;
