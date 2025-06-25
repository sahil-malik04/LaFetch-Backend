const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const taxes = sequelize.define("taxes", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  value: { type: DataTypes.FLOAT, allowNull: false },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("taxes table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = taxes;
