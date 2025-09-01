const {
  getBlogsUser,
  addBlogUser,
  deleteBlogUser,
  updateBlogUser,
  getBlogByIdUser,
  getBlogCategoriesUser,
  addBlogCategoryUser,
  updateBlogCategoryUser,
  deleteBlogCategoryUser,
} = require("../services/blogService");

const getBlogs = async (req, res) => {
  try {
    const query = req.query;
    const result = await getBlogsUser(query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addBlog = async (req, res) => {
  try {
    const payload = req.body;
    const reqFiles = req.files;
    const result = await addBlogUser(payload, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const payload = req.params;
    const result = await deleteBlogUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateBlog = async (req, res) => {
  try {
    const payload = req.body;
    const reqFiles = req.files;
    const result = await updateBlogUser(payload, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getBlogById = async (req, res) => {
  try {
    const payload = req.params;
    const result = await getBlogByIdUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getBlogCategories = async (req, res) => {
  try {
    const result = await getBlogCategoriesUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addBlogCategory = async (req, res) => {
  try {
    const payload = req.body;
    const result = await addBlogCategoryUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateBlogCategory = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateBlogCategoryUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteBlogCategory = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteBlogCategoryUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
  getBlogCategories,
  addBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
