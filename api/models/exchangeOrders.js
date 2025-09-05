const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const orders = require("./ordersModel.js");
const order_items = require("./orderItemsModel.js");

const exchangeOrders = sequelize.define("exchange_orders", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  // Relations
  orderId: { type: DataTypes.INTEGER, allowNull: false },      // parent order
  orderItemId: { type: DataTypes.INTEGER, allowNull: false },  // item being exchanged
  oldVariantId: { type: DataTypes.INTEGER, allowNull: false }, // original size
  newVariantId: { type: DataTypes.INTEGER, allowNull: false }, // new size

  // Details
  reason: { type: DataTypes.STRING, allowNull: true },
  status: {
    type: DataTypes.ENUM("requested", "approved", "picked_up", "delivered", "completed", "rejected"),
    allowNull: false,
    defaultValue: "requested",
  },

  // Timeline
  requestedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  approvedAt: { type: DataTypes.DATE, allowNull: true },
  pickedupAt: { type: DataTypes.DATE, allowNull: true },
  deliveredAt: { type: DataTypes.DATE, allowNull: true },  // new size delivered
  completedAt: { type: DataTypes.DATE, allowNull: true },
  rejectedAt: { type: DataTypes.DATE, allowNull: true },
});


exchangeOrders.belongsTo(orders, { foreignKey: "orderId" });
exchangeOrders.belongsTo(order_items, { foreignKey: "orderItemId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("exchange_orders table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = exchangeOrders;
