const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const servicesIntegration = sequelize.define("services_integration", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  link: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: true },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("services_integration table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = servicesIntegration;
