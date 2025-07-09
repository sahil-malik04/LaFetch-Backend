const {
  getWishlistUser,
  addToWishlistUser,
  removeFromWishlistUser,
  addWishlistBoardUser,
  deleteWishlistBoardUser,
  renameBoardUser,
  getAllWishlistUser,
  getWishlistBoardsUser,
} = require("../services/wishlistServices");

const getWishlistBoards = async (req, res) => {
  try {
    const params = req.params;
    const result = await getWishlistBoardsUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addWishlistBoard = async (req, res) => {
  try {
    const payload = req.body;
    const result = await addWishlistBoardUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteWishlistBoard = async (req, res) => {
  try {
    const payload = req.params;
    const result = await deleteWishlistBoardUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const renameBoard = async (req, res) => {
  try {
    const params = req.params;
    const payload = req.body;
    const result = await renameBoardUser(params, payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getWishlist = async (req, res) => {
  try {
    const payload = req.params;
    const result = await getWishlistUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addToWishlist = async (req, res) => {
  try {
    const payload = req.body;
    const result = await addToWishlistUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const payload = req.body;
    const result = await removeFromWishlistUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getAllWishlist = async (req, res) => {
  try {
    const result = await getAllWishlistUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getWishlistBoards,
  addWishlistBoard,
  deleteWishlistBoard,
  renameBoard,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getAllWishlist,
};
