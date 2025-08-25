const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const wishlistBoards = sequelize.define("wishlist_boards", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  addedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("wishlistBoards table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = wishlistBoards;
