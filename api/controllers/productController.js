const {
  getProductsUser,
  getProductByIdUser,
  getBannersUser,
  addBannerUser,
  updateBannerUser,
  deleteBannerUser,
  updateProductUser,
  getBannerByIdUser,
  syncProductsUser,
  getSizeChartsUser,
  addSizeChartUser,
  updateSizeChartUser,
  deleteSizeChartUser,
  getSizeChartByIdUser,
} = require("../services/productServices");

const getProducts = async (req, res) => {
  try {
    const query = req.query;
    const result = await getProductsUser(query);
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

const updateProduct = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateProductUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getBanners = async (req, res) => {
  try {
    const query = req.query;
    const result = await getBannersUser(query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getBannerById = async (req, res) => {
  try {
    const params = req.params;
    const result = await getBannerByIdUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addBanner = async (req, res) => {
  try {
    const payload = req.body;
    const reqFiles = req.files;
    const result = await addBannerUser(payload, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateBanner = async (req, res) => {
  try {
    const params = req.params;
    const payload = req.body;
    const reqFiles = req.files;
    const result = await updateBannerUser(params, payload, reqFiles);
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

const syncProducts = async (req, res) => {
  try {
    const query = req.query;
    const result = await syncProductsUser(query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getSizeCharts = async (req, res) => {
  try {
    const result = await getSizeChartsUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addSizeChart = async (req, res) => {
  try {
    const body = req.body;
    const reqFiles = req.files;
    const result = await addSizeChartUser(body, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateSizeChart = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const reqFiles = req.files;
    const result = await updateSizeChartUser(params, body, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteSizeChart = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteSizeChartUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getSizeChartById = async (req, res) => {
  try {
    const params = req.params;
    const result = await getSizeChartByIdUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  updateProduct,
  getBanners,
  getBannerById,
  addBanner,
  updateBanner,
  deleteBanner,
  syncProducts,
  getSizeCharts,
  addSizeChart,
  updateSizeChart,
  deleteSizeChart,
  getSizeChartById,
};
