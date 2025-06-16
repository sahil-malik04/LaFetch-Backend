const {
  addToCartUser,
  getCartItemsUser,
  removeCartItemUser,
} = require("../services/cartServices");

const addToCart = async (req, res) => {
  try {
    const body = req.body;
    const result = await addToCartUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getCartItems = async (req, res) => {
  try {
    const params = req.params;
    const result = await getCartItemsUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const removeCartItem = async (req, res) => {
  try {
    const body = req.body;
    const result = await removeCartItemUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem,
};
