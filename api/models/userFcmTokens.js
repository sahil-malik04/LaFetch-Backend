const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const users = require("./userModel.js");

const userFcmTokens = sequelize.define("user_fcm_tokens", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false },
  deviceType: { type: DataTypes.STRING, allowNull: true },
});

userFcmTokens.belongsTo(users, { foreignKey: "userId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("user_fcm_tokens table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = userFcmTokens;
