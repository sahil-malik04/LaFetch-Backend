const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const returnPolicies = sequelize.define("return_policies", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  vendorId: { type: DataTypes.INTEGER, allowNull: false },
  brandId: { type: DataTypes.INTEGER, allowNull: false },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("return_policies table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = returnPolicies;
