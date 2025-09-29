const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const brands = require("./brandsModel.js");
const category = require("./categoryModel.js");

const products = sequelize.define("products", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  type: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  shortDescription: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  slug: { type: DataTypes.STRING, allowNull: true },

  superCatId: { type: DataTypes.INTEGER, allowNull: true },
  catId: { type: DataTypes.INTEGER, allowNull: true },
  subCatId: { type: DataTypes.INTEGER, allowNull: true },
  brandId: { type: DataTypes.INTEGER, allowNull: true },

  status: { type: DataTypes.BOOLEAN, defaultValue: false },
  tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  publishedAt: { type: DataTypes.STRING, allowNull: false },

  imageUrls: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },

  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  numReviews: { type: DataTypes.INTEGER, defaultValue: 0 },

  shopifyProductId: { type: DataTypes.STRING, allowNull: true },
  shopifyHandle: { type: DataTypes.STRING, allowNull: true },
  shopifyCreatedAt: { type: DataTypes.DATE, allowNull: true },
  shopifyUpdatedAt: { type: DataTypes.DATE, allowNull: true },

  seoTitle: { type: DataTypes.STRING, allowNull: true },
  seoDescription: { type: DataTypes.TEXT, allowNull: true },
  sku: { type: DataTypes.STRING, allowNull: true },
  lfSku: { type: DataTypes.STRING, allowNull: true },

  targetGenders: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  fabrics: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  colorPatterns: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  basePrice: { type: DataTypes.FLOAT, allowNull: true },
  collectionID: { type: DataTypes.INTEGER, allowNull: true },

  hasCOD: { type: DataTypes.BOOLEAN, allowNull: true },
  hasExchange: { type: DataTypes.BOOLEAN, allowNull: true },
  exchangeDays: { type: DataTypes.INTEGER, allowNull: true },
  manufacturingAmount: { type: DataTypes.FLOAT, allowNull: true },
  mrp: { type: DataTypes.FLOAT, allowNull: true },
  msp: { type: DataTypes.FLOAT, allowNull: true },
  lfMsp: { type: DataTypes.FLOAT, allowNull: true },
  sellingAmount: { type: DataTypes.FLOAT, allowNull: true },
  netAmount: { type: DataTypes.FLOAT, allowNull: true },
  addedFrom: {
    type: DataTypes.ENUM("admin", "vendor", "shopify"),
    allowNull: true,
  },
});

products.belongsTo(brands, { foreignKey: "brandId" });
products.belongsTo(category, { foreignKey: "superCatId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("products table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = products;
