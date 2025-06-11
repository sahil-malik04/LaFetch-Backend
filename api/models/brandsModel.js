const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const brands = sequelize.define("brands", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  commission: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("brands table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = brands;
