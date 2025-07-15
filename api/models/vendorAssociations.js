const vendors = require("./vendorsModel");
const brands = require("./brandsModel");
const vendorBrands = require("./vendorBrandsModel");

const associateVendorModels = () => {
  vendors.belongsToMany(brands, {
    through: vendorBrands,
    foreignKey: "vendorId",
  });

  brands.belongsToMany(vendors, {
    through: vendorBrands,
    foreignKey: "brandId",
  });
};

module.exports = associateVendorModels;
