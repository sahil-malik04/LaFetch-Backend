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
  updateProductStatusUser,
  deleteProductUser,
  onboardProductUser,
  updateProductVariantUser,
  deleteProductVariantUser,
  getProductCollectionsUser,
  addProductCollectionUser,
  updateProductCollectionUser,
  deleteProductCollectionUser,
  getCollectionWithProductsUser,
  productSearchUser,
  productSuggestionUser,
  getBrandProductsUser,
  viewProductVariantsUser,
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
    const reqFiles = req.files;
    const result = await updateProductUser(params, body, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const params = req.params;
    const result = await updateProductStatusUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteProductUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const onboardProduct = async (req, res) => {
  try {
    const body = req.body;
    const reqFiles = req.files;
    const result = await onboardProductUser(body, reqFiles);
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

const updateProductVariant = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateProductVariantUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteProductVariant = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteProductVariantUser(params);
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
    const query = req.query;
    const result = await getSizeChartsUser(query);
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

const getProductCollections = async (req, res) => {
  try {
    const result = await getProductCollectionsUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addProductCollection = async (req, res) => {
  try {
    const body = req.body;
    const result = await addProductCollectionUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateProductCollection = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateProductCollectionUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteProductCollection = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteProductCollectionUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getCollectionWithProducts = async (req, res) => {
  try {
    const query = req.query;
    const result = await getCollectionWithProductsUser(query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const productSearch = async (req, res) => {
  try {
    const query = req.query;
    const result = await productSearchUser(query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const productSuggestion = async (req, res) => {
  try {
    const query = req.query;
    const result = await productSuggestionUser(query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getBrandProducts = async (req, res) => {
  try {
    const payload = req.params;
    const result = await getBrandProductsUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const viewProductVariants = async (req, res) => {
  try {
    const payload = req.params;
    const result = await viewProductVariantsUser(payload);
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
  updateProductStatus,
  deleteProduct,
  onboardProduct,
  updateProductVariant,
  deleteProductVariant,
  getProductCollections,
  addProductCollection,
  updateProductCollection,
  deleteProductCollection,
  getCollectionWithProducts,
  productSearch,
  productSuggestion,
  getBrandProducts,
  viewProductVariants,
};
