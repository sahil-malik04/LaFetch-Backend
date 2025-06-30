const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const brands = require("./brandsModel.js");
const category = require("./categoryModel.js");

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
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  brandId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

banners.belongsTo(brands, { foreignKey: "brandId" });
banners.belongsTo(category, { foreignKey: "categoryId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("banners table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = banners;
