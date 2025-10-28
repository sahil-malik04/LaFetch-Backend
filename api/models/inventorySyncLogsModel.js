const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const inventories = require("./inventoriesModel.js");

const inventorySyncLogs = sequelize.define("inventory_sync_logs", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  inventoryId: { type: DataTypes.INTEGER, allowNull: false },
  source: {
    type: DataTypes.ENUM("manual", "cron", "webhook"),
    allowNull: false,
  },
  previousStock: { type: DataTypes.INTEGER },
  newStock: { type: DataTypes.INTEGER },
  syncedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  rawPayload: { type: DataTypes.JSONB }, // Shopify response snapshot
});

inventorySyncLogs.belongsTo(inventories, { foreignKey: "inventoryId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("inventory_sync_logs table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = inventorySyncLogs;
