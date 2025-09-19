const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const promotions = sequelize.define("promotions", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false, // Internal campaign name
  },

  discountType: {
    type: DataTypes.ENUM("percentage"), // extensible later
    allowNull: false,
    defaultValue: "percentage",
  },
  discountValue: {
    type: DataTypes.DECIMAL(5, 2), // e.g. 30 = 30%
    allowNull: false,
  },

  appliesTo: {
    type: DataTypes.ENUM("site", "brand", "category"),
    allowNull: false,
  },

  applicateOn: {
    type: DataTypes.JSONB,
    allowNull: true,
    // Example: [1, 2, 3] for brand/category IDs
  },

  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  badgeText: {
    type: DataTypes.STRING,
    allowNull: true, // e.g. "-30% OFF"
  },

  banner_image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM("active", "scheduled", "inactive"),
    defaultValue: "inactive",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("promotions table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = promotions;
