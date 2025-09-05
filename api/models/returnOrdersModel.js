const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const orders = require("./ordersModel.js");
const order_items = require("./orderItemsModel.js");
const payments = require("./paymentsModel.js");

const returnOrders = sequelize.define("return_orders", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  // Relations
  orderId: { type: DataTypes.INTEGER, allowNull: false },   // original order
  orderItemId: { type: DataTypes.INTEGER, allowNull: true }, // partial return
  paymentId: { type: DataTypes.INTEGER, allowNull: true },   // linked payment (if refund needed)
  refundPaymentId: { type: DataTypes.STRING, allowNull: true }, // Razorpay refund id

  // Details
  reason: { type: DataTypes.STRING, allowNull: true },
  status: {
    type: DataTypes.ENUM("requested", "approved", "picked_up", "refunded", "completed", "rejected"),
    allowNull: false,
    defaultValue: "requested",
  },
  refundAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },

  // Timeline
  requestedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  approvedAt: { type: DataTypes.DATE, allowNull: true },
  pickedupAt: { type: DataTypes.DATE, allowNull: true },
  refundedAt: { type: DataTypes.DATE, allowNull: true },
  completedAt: { type: DataTypes.DATE, allowNull: true },
  rejectedAt: { type: DataTypes.DATE, allowNull: true },
});

returnOrders.belongsTo(orders, { foreignKey: "orderId" });
returnOrders.belongsTo(order_items, { foreignKey: "orderItemId" });
returnOrders.belongsTo(payments, { foreignKey: "paymentId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("return_orders table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = returnOrders;
