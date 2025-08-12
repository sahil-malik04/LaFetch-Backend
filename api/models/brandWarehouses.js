const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");

const brandWarehouses = sequelize.define("brand_warehouses", {
  brandId: {
    type: DataTypes.INTEGER,
    references: {
      model: "brands",
      key: "id",
    },
  },
  warehouseId: {
    type: DataTypes.INTEGER,
    references: {
      model: "warehouse",
      key: "id",
    },
  },
});

module.exports = brandWarehouses;
