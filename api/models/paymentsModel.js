const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const orders = require("./ordersModel.js");

const payments = sequelize.define("payments", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  provider: { type: DataTypes.STRING, allowNull: false }, // Razorpay, Stripe, PayPal
  method: { type: DataTypes.STRING, allowNull: false }, // upi, card, netbanking, cod
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  currency: { type: DataTypes.STRING, defaultValue: "INR" },
  status: {
    type: DataTypes.ENUM("initiated", "success", "failed", "refunded"),
    defaultValue: "initiated",
  },
  providerPaymentId: { type: DataTypes.STRING, allowNull: true }, // Razorpay payment_id
  providerOrderId: { type: DataTypes.STRING, allowNull: true }, // Razorpay order_id
  providerSignature: { type: DataTypes.STRING, allowNull: true }, // Razorpay order_id
  refundId: { type: DataTypes.STRING, allowNull: true }, // Razorpay refund id
});

payments.belongsTo(orders, { foreignKey: "orderId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("payments table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = payments;
