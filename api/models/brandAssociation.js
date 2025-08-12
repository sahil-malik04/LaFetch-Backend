const brands = require("./brandsModel");
const warehouse = require("./warehouseModel");
const brandWarehouses = require("./brandWarehouses");

const associateBrandModels = () => {
  brands.belongsToMany(warehouse, {
    through: brandWarehouses,
    foreignKey: "brandId",
    otherKey: "warehouseId",
  });

  warehouse.belongsToMany(brands, {
    through: brandWarehouses,
    foreignKey: "warehouseId",
    otherKey: "brandId",
  });
};

module.exports = associateBrandModels;
