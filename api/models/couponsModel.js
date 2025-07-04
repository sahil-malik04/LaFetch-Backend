const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const brands = require("./brandsModel.js");

const coupons = sequelize.define("coupons", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brandId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // Basic details
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  // Coupon settings
  isPrivate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  minPurchase: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  maxDiscountAmount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  // Usage limits
  useLimit: {
    type: DataTypes.INTEGER,
    defaultValue: -1,
  },
  userLimit: {
    type: DataTypes.INTEGER,
    defaultValue: -1,
  },

  // Dates
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  // Status
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

coupons.belongsTo(brands, { foreignKey: "brandId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("coupons table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = coupons;
