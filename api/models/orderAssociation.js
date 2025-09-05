const order_items = require("./orderItemsModel");
const orders = require("./ordersModel");
const products = require("./productsModel");
const users = require("./userModel");
const warehouse = require("./warehouseModel");

const associateOrderModels = () => {
  orders.hasMany(order_items, { foreignKey: "orderId" });

  order_items.belongsTo(orders, { foreignKey: "orderId" });
  order_items.belongsTo(products, { foreignKey: "productId" });
  orders.belongsTo(users, { foreignKey: "userId" });
  orders.belongsTo(warehouse, { foreignKey: "warehouseId" });
};

module.exports = associateOrderModels;
