const {
  signUpSendOtpUser,
  verifyOtpUser,
  resendOtpUser,
  updateUserProfileService,
  signInSendOtpUser,
  deleteAccountUser,
  signOutUser,
  refreshTokenUser,
} = require("../services/authServices");

const signUpSendOtp = async (req, res) => {
  try {
    const payload = req.body;
    const result = await signUpSendOtpUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const payload = req.body;
    const result = await verifyOtpUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const resendOtp = async (req, res) => {
  try {
    const payload = req.body;
    const result = await resendOtpUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const payload = req.body;
    const result = await updateUserProfileService(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const signInSendOtp = async (req, res) => {
  try {
    const payload = req.body;
    const result = await signInSendOtpUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteAccount = async (req, res) => {
  try {
    const payload = req.params;
    const result = await deleteAccountUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const signOut = async (req, res) => {
  try {
    const payload = req.params;
    const result = await signOutUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const refreshToken = async (req, res) => {
  try {
    const payload = req.body;
    const result = await refreshTokenUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  signUpSendOtp,
  verifyOtp,
  resendOtp,
  updateUserProfile,
  signInSendOtp,
  deleteAccount,
  signOut,
  refreshToken,
};
