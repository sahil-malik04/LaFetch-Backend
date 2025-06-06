const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig.js");
const brands = require("./brandsModel.js");
const category = require("./categoryModel.js");
const warehouse = require("./warehouseModel.js");

const products = sequelize.define("products", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  type: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },

  categoryId: { type: DataTypes.INTEGER, allowNull: false },
  brandId: { type: DataTypes.INTEGER, allowNull: false },
  warehouseId: { type: DataTypes.INTEGER, allowNull: true },

  status: { type: DataTypes.STRING, allowNull: false },
  tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  publishedAt: { type: DataTypes.STRING, allowNull: false },

  imageUrls: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },

  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  numReviews: { type: DataTypes.INTEGER, defaultValue: 0 },

  shopifyProductId: { type: DataTypes.STRING, allowNull: true },
  shopifyHandle: { type: DataTypes.STRING, allowNull: true },
  shopifyCreatedAt: { type: DataTypes.DATE, allowNull: true },
  shopifyUpdatedAt: { type: DataTypes.DATE, allowNull: true },

  seoTitle: { type: DataTypes.STRING, allowNull: true },
  seoDescription: { type: DataTypes.TEXT, allowNull: true },

  targetGenders: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  fabrics: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  colorPatterns: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  basePrice: { type: DataTypes.FLOAT, allowNull: true },
  collectionType: {
    type: DataTypes.ENUM(
      "lafetch-exclusive",
      "premium",
      "luxurious",
      "standard"
    ),
    allowNull: true,
    defaultValue: "Standard",
  },
});

products.belongsTo(brands, { foreignKey: "brandId" });
products.belongsTo(category, { foreignKey: "categoryId" });
products.belongsTo(warehouse, { foreignKey: "warehouseId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("products table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = products;
