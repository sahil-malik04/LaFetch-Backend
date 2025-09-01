const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");
const blogCategoriesModel = require("./blogCategoryModel");

const blogs = sequelize.define("blogs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("draft", "published", "archived"),
    defaultValue: "draft",
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  meta_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  meta_keywords: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  meta_tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

blogs.belongsTo(blogCategoriesModel, {
  foreignKey: "category_id",
  as: "category",
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("blogs table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = blogs;
