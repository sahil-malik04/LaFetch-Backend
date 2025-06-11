const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const countries = sequelize.define("countries", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("countries table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = countries;
