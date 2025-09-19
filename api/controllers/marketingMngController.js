const {
  addCouponUser,
  getCouponUser,
  updateCouponUser,
  deleteCouponUser,
  getCouponByIdUser,
  getPromotionsUser,
  addPromotionUser,
  updatePromotionUser,
  deletePromotionUser,
  updatePromotionStatusUser,
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
    const query = req.query;
    const result = await getCouponUser(query);
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

const getPromotions = async (req, res) => {
  try {
    const query = req.query;
    const result = await getPromotionsUser(query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addPromotion = async (req, res) => {
  try {
    const body = req.body;
    const reqFiles = req.files;
    const result = await addPromotionUser(body, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updatePromotion = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const reqFiles = req.files;
    const result = await updatePromotionUser(params, body, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deletePromotion = async (req, res) => {
  try {
    const params = req.params;
    const result = await deletePromotionUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updatePromotionStatus = async (req, res) => {
  try {
    const params = req.params;
    const query = req.query;
    const result = await updatePromotionStatusUser(params, query);
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
  getPromotions,
  addPromotion,
  updatePromotion,
  deletePromotion,
  updatePromotionStatus,
};
