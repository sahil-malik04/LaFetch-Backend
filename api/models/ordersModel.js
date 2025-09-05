const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const orders = sequelize.define("orders", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  // Relations
  userId: { type: DataTypes.INTEGER, allowNull: false },
  shiprocketOrderId: { type: DataTypes.STRING, allowNull: true },
  deliveryPartnerId: { type: DataTypes.INTEGER, allowNull: true },
  warehouseId: { type: DataTypes.INTEGER, allowNull: true },
  payoutId: { type: DataTypes.STRING, allowNull: true },

  // Financials
  totalMRP: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  couponDiscount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  shippingCost: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  tax: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },

  // Status
  status: {
    type: DataTypes.ENUM(
      "placed",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
      "returned"
    ),
    allowNull: false,
    defaultValue: "placed",
  },

  // Timeline
  orderedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  paymentMethod: {
    type: DataTypes.ENUM("cod", "prepaid"),
    allowNull: false,
    defaultValue: "prepaid",
  },
  paymentStatus: {
    type: DataTypes.ENUM("pending", "paid", "failed", "refunded"),
    defaultValue: "pending",
  },
  paymentDate: { type: DataTypes.DATE, allowNull: true },

  deliveredAt: { type: DataTypes.DATE, allowNull: true },
  cancelledAt: { type: DataTypes.DATE, allowNull: true },

  // Admin
  internalNote: { type: DataTypes.TEXT, allowNull: true },
  deliveryPhoto: { type: DataTypes.STRING, allowNull: true },

  // Refunds
  razorpayRefundId: { type: DataTypes.STRING, allowNull: true },
  razorpayRefundResponse: { type: DataTypes.JSON, allowNull: true },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("orders table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = orders;
