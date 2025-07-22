const {
  getCategoriesUser,
  addCategoryUser,
  updateCategoryUser,
  deleteCategoryUser,
  getCategoryByIdUser,
} = require("../services/categoryServices");

const getCategories = async (req, res) => {
  try {
    const query = req.query;
    const result = await getCategoriesUser(query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const params = req.params;
    const result = await getCategoryByIdUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addCategory = async (req, res) => {
  try {
    const body = req.body;
    const reqFiles = req.files;
    const result = await addCategoryUser(body, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateCategory = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const reqFiles = req.files;
    const result = await updateCategoryUser(params, body, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteCategoryUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
