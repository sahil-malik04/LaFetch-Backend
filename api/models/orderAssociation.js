const order_items = require("./orderItemsModel");
const orders = require("./ordersModel");
const products = require("./productsModel");
const user_addresses = require("./userAddressesModel");
const users = require("./userModel");
const warehouse = require("./warehouseModel");

const associateOrderModels = () => {
  orders.hasMany(order_items, { foreignKey: "orderId" });

  order_items.belongsTo(orders, { foreignKey: "orderId" });
  order_items.belongsTo(products, { foreignKey: "productId" });
  order_items.belongsTo(warehouse, { foreignKey: "warehouseId" });
  orders.belongsTo(users, { foreignKey: "userId" });
  orders.belongsTo(user_addresses, { foreignKey: "shippingAddressId" });
};

module.exports = associateOrderModels;
