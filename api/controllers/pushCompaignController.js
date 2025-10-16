const {
  createPushCompaignUser,
  updatePushCompaignUser,
  getPushCompaignsUser,
  deletePushCompaignUser,
  sendCompaignNotificationUser,
  createFCMTokenUser,
} = require("../services/pushCompaignServices");

const createPushCompaign = async (req, res) => {
  try {
    const body = req.body;
    const result = await createPushCompaignUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updatePushCompaign = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updatePushCompaignUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getPushCompaigns = async (req, res) => {
  try {
    const result = await getPushCompaignsUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deletePushCompaign = async (req, res) => {
  try {
    const params = req.params;
    const result = await deletePushCompaignUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const sendCompaignNotification = async (req, res) => {
  try {
    const params = req.params;
    const result = await sendCompaignNotificationUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const createFCMToken = async (req, res) => {
  try {
    const body = req.body;
    const result = await createFCMTokenUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  createPushCompaign,
  updatePushCompaign,
  getPushCompaigns,
  deletePushCompaign,
  sendCompaignNotification,
  createFCMToken,
};
