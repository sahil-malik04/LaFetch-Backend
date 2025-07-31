const { addReviewUser, getReviewsUser } = require("../services/reviewServices");

const addReview = async (req, res) => {
  try {
    const body = req.body;
    const result = await addReviewUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getReviews = async (req, res) => {
  try {
    const query = req.query;
    const result = await getReviewsUser(query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  addReview,
  getReviews,
};
