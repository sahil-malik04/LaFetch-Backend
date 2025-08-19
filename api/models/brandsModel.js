const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");

const brands = sequelize.define("brands", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  commission: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  PAN: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  GST: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  incorporationCertificate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  udhyamAadhar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  trademarkCertificate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  authorizedSignatoryIDProof: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  qualityAssuranceCertificate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  businessName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tradeName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  brandEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  codAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  websiteLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deliveryType: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },

  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("brands table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = brands;
