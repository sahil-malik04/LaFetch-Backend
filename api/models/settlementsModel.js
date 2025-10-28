const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const brands = require("./brandsModel.js");
const vendors = require("./vendorsModel.js");
const order_items = require("./orderItemsModel.js");

const settlements = sequelize.define("settlements", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  // Relations
  orderItemId: { type: DataTypes.INTEGER, allowNull: false },
  brandId: { type: DataTypes.INTEGER, allowNull: false }, // item being exchanged
  vendorId: { type: DataTypes.INTEGER, allowNull: false },

  totalAmountPaid: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  itemPrice: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
});

settlements.belongsTo(order_items, { foreignKey: "orderItemId" });
settlements.belongsTo(brands, { foreignKey: "brandId" });
settlements.belongsTo(vendors, { foreignKey: "vendorId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("settlements table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = settlements;
