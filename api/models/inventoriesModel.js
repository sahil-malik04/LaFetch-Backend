const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const inventories = sequelize.define("inventories", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  variantId: { type: DataTypes.INTEGER, allowNull: false },
  availableStock: { type: DataTypes.INTEGER, defaultValue: 0 },
  reservedStock: { type: DataTypes.INTEGER, defaultValue: 0 }, // reserved during checkout
  warehouseId: { type: DataTypes.INTEGER, allowNull: true },
  lastSyncedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("inventories table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = inventories;
