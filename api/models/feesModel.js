const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const brands = require("./brandsModel.js");

const fees = sequelize.define("fees", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  scope: {
    type: DataTypes.ENUM("global", "brand"),
    allowNull: false,
    defaultValue: "global",
  },
  brandId: { type: DataTypes.INTEGER, allowNull: true },
  convenienceFeeType: {
    type: DataTypes.ENUM("fixed", "percentage"),
    defaultValue: "fixed",
  },
  convenienceFeeValue: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  gstPercent: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
  deliveryBaseFee: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  deliveryPerKm: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  freeDeliveryThreshold: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: null,
  },
});

fees.belongsTo(brands, { foreignKey: "brandId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("fees table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = fees;
