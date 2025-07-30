const {
  getShopifyAccountsUser,
  addShopifyAccountUser,
  updateShopifyAccountUser,
  deleteShopifyAccountUser,
} = require("../services/shopifyMngServices");

const getShopifyAccounts = async (req, res) => {
  try {
    const result = await getShopifyAccountsUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addShopifyAccount = async (req, res) => {
  try {
    const body = req.body;
    const result = await addShopifyAccountUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateShopifyAccount = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateShopifyAccountUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteShopifyAccount = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteShopifyAccountUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getShopifyAccounts,
  addShopifyAccount,
  updateShopifyAccount,
  deleteShopifyAccount,
};
