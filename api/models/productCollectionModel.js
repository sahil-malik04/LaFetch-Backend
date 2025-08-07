const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const productCollection = sequelize.define("product_collection", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("product_collection created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = productCollection;
