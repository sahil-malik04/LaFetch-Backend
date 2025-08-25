const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM("super", "category", "sub"),
    allowNull: false,
    defaultValue: "category",
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  banner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  addedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("category table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = category;
