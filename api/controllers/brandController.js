const {
  getBrandsUser,
  getBrandByIdUser,
  getProductsByBrandUser,
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

const getProductsByBrand = async (req, res) => {
  try {
    const params = req.params;
    const result = await getProductsByBrandUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getBrands,
  getProductsByBrand,
};
