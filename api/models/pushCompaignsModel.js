const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const pushCampaign = sequelize.define("push_campaigns", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false },
  richMediaUrl: { type: DataTypes.STRING, allowNull: true },
  clickActionType: { 
    type: DataTypes.ENUM("HOMEPAGE","BRAND","CATEGORY","PRODUCT"),
    allowNull: false,
    defaultValue: "HOMEPAGE"
  },
  clickActionId: { type: DataTypes.INTEGER, allowNull: true }, // brandId / categoryId / productId
  status: { 
    type: DataTypes.ENUM("DRAFT", "SCHEDULED", "SENT", "PAUSED", "CANCELLED"),
    defaultValue: "DRAFT"
  },
  sendNow: { type: DataTypes.BOOLEAN, defaultValue: false },
  scheduledAt: { type: DataTypes.DATE, allowNull: true },
  recurring: { type: DataTypes.BOOLEAN, defaultValue: false },
  recurringFrequency: { type: DataTypes.ENUM("DAILY","WEEKLY"), allowNull: true },
  recurringTime: { type: DataTypes.TIME, allowNull: true },
  recurringEndDate: { type: DataTypes.DATE, allowNull: true },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("push_campaigns table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = pushCampaign;
