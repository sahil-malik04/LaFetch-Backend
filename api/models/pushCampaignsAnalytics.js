const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const pushCampaign = require("./pushCompaignsModel.js");

const pushCampaignAnalytics = sequelize.define("push_campaign_analytics", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  campaignId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  delivered: { type: DataTypes.BOOLEAN, defaultValue: false },
  opened: { type: DataTypes.BOOLEAN, defaultValue: false },
  clicked: { type: DataTypes.BOOLEAN, defaultValue: false },
});

pushCampaignAnalytics.belongsTo(pushCampaign, { foreignKey: "campaignId" });

module.exports = pushCampaignAnalytics;
