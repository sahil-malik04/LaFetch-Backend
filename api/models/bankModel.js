const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const banks = sequelize.define("banks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accountHolderName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IFSC: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  branchName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("banks table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = banks;
