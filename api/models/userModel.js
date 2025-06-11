const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const roles = require("./roleModel.js");

const users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM("male", "female", "other"),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^[0-9\-+\s()]*$/i,
    },
    unique: true,
  },
  sentOtp: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  isLoggedIn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isAccountDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

users.belongsTo(roles, { foreignKey: "brandId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("user table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = users;
