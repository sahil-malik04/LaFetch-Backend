const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const users = require("./userModel.js");
const banks = require("./bankModel.js");

const vendors = sequelize.define("vendors", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  businessEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alternateContact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bankId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  PAN: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cancelledChequeOrPassbook: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  businessRegistrationCertificate: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  onBoardingCompletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

vendors.belongsTo(users, { foreignKey: "userId" });
vendors.belongsTo(banks, { foreignKey: "bankId" });


// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("vendors table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = vendors;
