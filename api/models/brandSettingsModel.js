const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const brands = require("./brandsModel.js");

const brandSettings = sequelize.define("brand_settings", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    brandId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    brandEnabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    quickDeliveryEnabled: { type: DataTypes.BOOLEAN, allowNull: true }, // null => follow global
    operatingHours: { type: DataTypes.JSON, allowNull: true }, // null => follow global
});

brandSettings.belongsTo(brands, { foreignKey: "brandId" });


// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("brand_settings table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = brandSettings;
