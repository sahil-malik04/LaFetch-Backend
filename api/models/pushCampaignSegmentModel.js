const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const pushCampaign = require("./pushCompaignsModel.js");

const pushCampaignSegment = sequelize.define("push_campaign_segments", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  campaignId: { type: DataTypes.INTEGER, allowNull: false },
  segmentType: {
    type: DataTypes.ENUM(
      "ALL_USERS",
      "ACTIVE_USERS",
      "INACTIVE_USERS",
      "NEW_CUSTOMERS",
      "REPEAT_CUSTOMERS",
      "LOYAL_CUSTOMERS",
      "HIGH_VALUE_CUSTOMERS",
      "NON_PURCHASERS",
      "ABANDONED_CART",
      "BRAND_AFFINITY",
      "CATEGORY_AFFINITY"
    ),
    allowNull: false,
  },
  segmentValue: { type: DataTypes.STRING, allowNull: true },
});

pushCampaignSegment.belongsTo(pushCampaign, { foreignKey: "campaignId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("push_campaign_segments table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = pushCampaignSegment;
