const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const roles = sequelize.define("roles", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permissions: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("roles table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = roles;
