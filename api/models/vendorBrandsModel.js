const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const vendorBrands = sequelize.define("vendor_brands", {
  vendorId: {
    type: DataTypes.INTEGER,
    references: {
      model: "vendors",
      key: "id",
    },
  },
  brandId: {
    type: DataTypes.INTEGER,
    references: {
      model: "brands",
      key: "id",
    },
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("vendor_brands table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = vendorBrands;
