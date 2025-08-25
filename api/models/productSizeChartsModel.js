const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const brands = require("./brandsModel.js");

const productSizeCharts = sequelize.define("product_size_charts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  superCatId: { type: DataTypes.INTEGER, allowNull: true },
  catId: { type: DataTypes.INTEGER, allowNull: true },
  subCatId: { type: DataTypes.INTEGER, allowNull: true },
  sizeGuideImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sizeChartData: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  addedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

productSizeCharts.belongsTo(brands, { foreignKey: "brandId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("products size created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = productSizeCharts;
