const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const banners = sequelize.define("banners", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("banners table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = banners;
