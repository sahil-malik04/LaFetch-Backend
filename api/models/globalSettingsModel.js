const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const globalSettings = sequelize.define("global_settings", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  // Relations
  quickDeliveryEnabled: { type: DataTypes.BOOLEAN, defaultValue: false },
  defaultOperatingHours: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {},
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("global_settings table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = globalSettings;
