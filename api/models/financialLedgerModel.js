const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const brands = require("./brandsModel.js");
const vendors = require("./vendorsModel.js");
const order_items = require("./orderItemsModel.js");

const financialLedger = sequelize.define("financial_ledger", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  // Relations
  orderItemId: { type: DataTypes.INTEGER, allowNull: false },
  brandId: { type: DataTypes.INTEGER, allowNull: false }, // item being exchanged
  vendorId: { type: DataTypes.INTEGER, allowNull: false },

  totalAmountPaid: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  itemPrice: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
  deliveryFee: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  convenienceFee: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  taxes: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  commissionRate: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
  commissionEarned: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  netPayableToVendor: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  settlementStatus: {
    type: DataTypes.ENUM("pending", "processing", "settled"),
    defaultValue: "pending",
  },
  settlementId: { type: DataTypes.INTEGER, allowNull: true },
});

financialLedger.belongsTo(order_items, { foreignKey: "orderItemId" });
financialLedger.belongsTo(brands, { foreignKey: "brandId" });
financialLedger.belongsTo(vendors, { foreignKey: "vendorId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("financial_ledger table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = financialLedger;
