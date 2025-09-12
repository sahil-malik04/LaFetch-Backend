const {
  placeOrderUser,
  orderHistoryUser,
  requestReturnUser,
  returnHistoryUser,
  requestExchangeUser,
  exchangeHistoryUser,
  requestCancelUser,
  orderHistoryAdminUser,
  viewOrderHistoryUser,
} = require("../services/orderMngServices");

const placeOrder = async (req, res) => {
  try {
    const body = req.body;
    const result = await placeOrderUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const orderHistory = async (req, res) => {
  try {
    const params = req.params;
    const result = await orderHistoryUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const requestReturn = async (req, res) => {
  try {
    const body = req.body;
    const result = await requestReturnUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const returnHistory = async (req, res) => {
  try {
    const params = req.params;
    const result = await returnHistoryUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const requestExchange = async (req, res) => {
  try {
    const body = req.body;
    const result = await requestExchangeUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const exchangeHistory = async (req, res) => {
  try {
    const params = req.params;
    const result = await exchangeHistoryUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const requestCancel = async (req, res) => {
  try {
    const body = req.body;
    const result = await requestCancelUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const orderHistoryAdmin = async (req, res) => {
  try {
    const query = req.query;
    const result = await orderHistoryAdminUser(query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const viewOrderHistory = async (req, res) => {
  try {
    const params = req.params;
    const result = await viewOrderHistoryUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  placeOrder,
  orderHistory,
  requestReturn,
  returnHistory,
  requestExchange,
  exchangeHistory,
  requestCancel,
  orderHistoryAdmin,
  viewOrderHistory
};
