const {
  getBrandsUser,
  viewBrandUser,
  makeBrandFeaturedUser,
  brandOnboardUser,
  editBrandUser,
  deleteBrandUser,
} = require("../services/brandServices");

const getBrands = async (req, res) => {
  try {
    const query = req.query;
    const result = await getBrandsUser(query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const viewBrand = async (req, res) => {
  try {
    const params = req.params;
    const result = await viewBrandUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const makeBrandFeatured = async (req, res) => {
  try {
    const params = req.params;
    const query = req.query;
    const result = await makeBrandFeaturedUser(params, query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const brandOnboard = async (req, res) => {
  try {
    const body = req.body;
    const reqFiles = req.files;
    const result = await brandOnboardUser(body, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const editBrand = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const reqFiles = req.files;
    const result = await editBrandUser(params, body, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteBrand = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteBrandUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getBrands,
  viewBrand,
  makeBrandFeatured,
  brandOnboard,
  editBrand,
  deleteBrand,
};
