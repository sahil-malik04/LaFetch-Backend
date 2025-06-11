const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const state = require("./stateModel.js");

const cities = sequelize.define("cities", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  stateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

cities.belongsTo(state, { foreignKey: "stateId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("cities table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = cities;
