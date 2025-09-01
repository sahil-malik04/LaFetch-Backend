const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");

const blogCategoriesModel = sequelize.define("blog_categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  page: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("blog_categories table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = blogCategoriesModel;
