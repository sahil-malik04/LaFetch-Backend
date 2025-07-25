const {
  addCouponUser,
  getCouponUser,
  updateCouponUser,
  deleteCouponUser,
  getCouponByIdUser,
} = require("../services/marketingMngServices");

const addCoupon = async (req, res) => {
  try {
    const body = req.body;
    const result = await addCouponUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getCoupon = async (req, res) => {
  try {
    const result = await getCouponUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateCoupon = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateCouponUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteCouponUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getCouponById = async (req, res) => {
  try {
    const params = req.params;
    const result = await getCouponByIdUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  addCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponById,
};
