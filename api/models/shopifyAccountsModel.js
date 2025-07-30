const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const vendors = require("./vendorsModel.js");

const shopifyAccounts = sequelize.define("shopify_accounts", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  vendorId: { type: DataTypes.INTEGER, allowNull: false },
  apiURL: { type: DataTypes.STRING, allowNull: true },
  accessToken: { type: DataTypes.STRING, allowNull: true },
});

shopifyAccounts.belongsTo(vendors, { foreignKey: "vendorId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("shopify_accounts created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = shopifyAccounts;
