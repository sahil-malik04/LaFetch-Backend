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
    unique: true,
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
  genderType: {
    type: DataTypes.ENUM("men", "women", "accessories"),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  banner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = category;
