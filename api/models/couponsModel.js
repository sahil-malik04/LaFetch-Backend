const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const coupons = sequelize.define("coupons", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  // Basic details
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  internalNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  discountType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  maxDiscountCap: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  minCartValue: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  freeShipping: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  firstTimeUsersOnly: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  totalUsageLimit: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  usageLimitPerUser: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  applicableOn: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },

  excludeSaleItems: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  selectUsers: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  targetSegments: {
    type: DataTypes.ENUM("men", "women", "both"),
    defaultValue: "both",
  },
  distributedChannels: {
    type: DataTypes.ENUM("website", "application", "both"),
    defaultValue: "both",
  },
  inviteOnlyCoupon: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  // Dates & Scheduling
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  enableScheduling: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  status: {
    type: DataTypes.ENUM("published", "expired", "draft"),
    defaultValue: "draft",
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("coupons created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = coupons;
