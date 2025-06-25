const {
  getTaxesuser,
  addTaxUser,
  updateTaxUser,
  deleteTaxuser,
} = require("../services/taxesServices");

const addTax = async (req, res) => {
  try {
    const body = req.body;
    const result = await addTaxUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getTaxes = async (req, res) => {
  try {
    const result = await getTaxesuser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateTax = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateTaxUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteTax = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteTaxuser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  addTax,
  getTaxes,
  updateTax,
  deleteTax,
};
