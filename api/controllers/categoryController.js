const {
  getCategoriesUser,
  addCategoryUser,
  updateCategoryUser,
  deleteCategoryUser,
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

const addCategory = async (req, res) => {
  try {
    const body = req.body;
    const result = await addCategoryUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateCategory = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateCategoryUser(params, body);
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
  addCategory,
  updateCategory,
  deleteCategory,
};
