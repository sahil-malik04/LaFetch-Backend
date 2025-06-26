const otpStartRange = 1000;
const otpEndRange = 9999;

const responseMessages = {
  ACCOUNT_DELETED:
    "Access denied. Your account is no longer active. Please reach out to the administrator for support.",
  PHONE_NOT_EXIST:
    "Phone No. doesn't Exist! Please check your Phone No. and try again!",
  PHONE_ALREADY_EXIST:
    "This phone number is already registered. Please log in instead.",
  OTP_SENT: "OTP has been sent successfully.",
  USER_NOT_EXIST: "Unauthorized! User account doesn't exist.",
  INCOMPLETE_USER_PROFILE:
    "Your profile is incomplete. Please complete your signup to proceed.",
  OTP_VERIFIED: "OTP verified successfully!",
  INCORRECT_OTP: "Incorrect OTP, Please try again!",
  PRODUCT_NOT_EXIST: "Product Doesn't Exist!",
  BANNER_NOT_EXIST: "Banner Doesn't Exist!",
};

const ROLES = Object.freeze({
  ADMIN: 1,
  USER: 3,
  VENDOR: 2,
});

module.exports = {
  otpStartRange,
  otpEndRange,
  responseMessages,
  ROLES,
};
