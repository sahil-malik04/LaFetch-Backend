const {
  getProductsUser,
  getProductByIdUser,
  getBannersUser,
  addBannerUser,
  updateBannerUser,
  deleteBannerUser,
  getCategoriesUser,
} = require("../services/productServices");

const getProducts = async (req, res) => {
  try {
    const params = req.query;
    const result = await getProductsUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getProductById = async (req, res) => {
  try {
    const params = req.params;
    const result = await getProductByIdUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getBanners = async (req, res) => {
  try {
    const result = await getBannersUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addBanner = async (req, res) => {
  try {
    const payload = req.body;
    const result = await addBannerUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateBanner = async (req, res) => {
  try {
    const params = req.params;
    const payload = req.body;
    const result = await updateBannerUser(params, payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteBanner = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteBannerUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getCategories = async (req, res) => {
  try {
    const result = await getCategoriesUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getBanners,
  addBanner,
  updateBanner,
  deleteBanner,
  getCategories,
};
