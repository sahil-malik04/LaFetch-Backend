const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const countries = require("./countryModel.js");

const states = sequelize.define("states", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  countryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

states.belongsTo(countries, { foreignKey: "countryId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("state table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = states;
