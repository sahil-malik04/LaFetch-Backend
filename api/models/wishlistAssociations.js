// associateModels.js
const products = require("./productsModel");
const users = require("./userModel");
const wishlistBoards = require("./wishlistBoardsModel");
const wishlist = require("./wishlistModel");

const associateWishlistModels = () => {
  wishlistBoards.belongsTo(users, { foreignKey: "userId" });
  users.hasMany(wishlistBoards, { foreignKey: "userId" });

  wishlist.belongsTo(wishlistBoards, { foreignKey: "boardId" });
  wishlistBoards.hasMany(wishlist, { foreignKey: "boardId" });

  wishlist.belongsTo(products, { foreignKey: "productId" });
};

module.exports = associateWishlistModels;
