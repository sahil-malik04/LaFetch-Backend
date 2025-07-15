const users = require("../models/userModel");
const vendors = require("../models/vendorsModel");
const {
  getRandomNumber,
  generateToken,
  verifyToken,
  decryptText,
} = require("../utils/commonFunc");
const {
  otpStartRange,
  otpEndRange,
  responseMessages,
  ROLES,
} = require("../utils/dataUtils");
const { rejectResponse, successResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");
const { sendCodeInNumber } = require("./bulkSMSService");

const signUpSendOtpUser = async (payload) => {
  try {
    const { phone } = payload;
    if (!phone) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Phone is required!"
      );
    } else {
      const isAccountDeleted = await users.findOne({
        where: {
          phone,
          isAccountDeleted: true,
        },
      });
      if (isAccountDeleted) {
        return rejectResponse(
          statusCode.CLIENT_ERROR.FORBIDDEN,
          responseMessages.ACCOUNT_DELETED
        );
      } else {
        const isActivePhoneExist = await users.findOne({
          where: {
            phone,
            isActive: true,
          },
        });
        if (isActivePhoneExist) {
          return rejectResponse(
            statusCode.CLIENT_ERROR.CONFLICT,
            responseMessages.PHONE_ALREADY_EXIST
          );
        } else {
          const code = getRandomNumber(otpStartRange, otpEndRange);
          const data = {
            sentOtp: code,
            roleId: ROLES.USER,
            updatedAt: new Date(),
          };
          const isMessageSent = await sendCodeInNumber(code, phone);

          if (isMessageSent?.code === 200) {
            const isPhoneExist = await users.findOne({
              where: {
                phone,
              },
            });
            if (isPhoneExist) {
              const updateUser = await isPhoneExist.update(data);
              if (updateUser) {
                return successResponse(
                  statusCode.SUCCESS.OK,
                  responseMessages.OTP_SENT
                );
              }
            } else {
              data.phone = phone;

              const createUser = await users.create(data);
              if (createUser) {
                return successResponse(
                  statusCode.SUCCESS.OK,
                  responseMessages.OTP_SENT
                );
              }
            }
          }
        }
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const verifyOtpUser = async (payload) => {
  try {
    const { phone, otp } = payload;
    if (!phone || !otp) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Phone and otp is required!"
      );
    } else {
      const isPhoneExist = await users.findOne({
        where: {
          phone,
        },
      });
      if (!isPhoneExist) {
        return rejectResponse(
          statusCode.CLIENT_ERROR.NOT_FOUND,
          responseMessages.PHONE_NOT_EXIST
        );
      } else {
        if (isPhoneExist.isAccountDeleted) {
          return rejectResponse(
            statusCode.CLIENT_ERROR.FORBIDDEN,
            responseMessages.ACCOUNT_DELETED
          );
        } else {
          if (Number(isPhoneExist?.sentOtp) === Number(otp)) {
            if (payload?.type === "login") {
              const tokenData = {
                id: isPhoneExist?.id,
                fullName: isPhoneExist?.fullName,
                email: isPhoneExist?.email,
                phone: isPhoneExist?.phone,
                role: isPhoneExist?.roleId,
              };
              const generateTokenResult = generateToken(tokenData);
              const generateRefreshTokenResult = generateToken(tokenData, "7d");
              if (generateToken) tokenData.token = generateTokenResult;
              if (generateRefreshTokenResult) {
                const data = {
                  refreshToken: generateRefreshTokenResult,
                };
                const updateUser = await isPhoneExist.update(data);
                if (updateUser) {
                  tokenData.refreshToken = generateRefreshTokenResult;
                }
              }
              return successResponse(
                statusCode.SUCCESS.OK,
                responseMessages.OTP_VERIFIED,
                tokenData
              );
            } else {
              return successResponse(
                statusCode.SUCCESS.OK,
                responseMessages.OTP_VERIFIED
              );
            }
          } else {
            return rejectResponse(
              statusCode.CLIENT_ERROR.NOT_FOUND,
              responseMessages.INCORRECT_OTP
            );
          }
        }
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const resendOtpUser = async (payload) => {
  try {
    const { phone } = payload;
    if (!phone) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Phone is required!"
      );
    } else {
      const code = getRandomNumber(otpStartRange, otpEndRange);

      const findUser = await users.findOne({
        where: {
          phone,
        },
      });
      if (findUser) {
        if (findUser.isAccountDeleted) {
          return rejectResponse(
            statusCode.CLIENT_ERROR.FORBIDDEN,
            responseMessages.ACCOUNT_DELETED
          );
        } else {
          const isMessageSent = await sendCodeInNumber(code, phone);
          if (isMessageSent?.code === 200) {
            const data = {
              sentOtp: code,
              updatedAt: new Date(),
            };
            const updateUser = await findUser.update(data);
            if (updateUser) {
              return successResponse(
                statusCode.SUCCESS.OK,
                responseMessages.OTP_SENT
              );
            }
          }
        }
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.NOT_FOUND,
          responseMessages.PHONE_NOT_EXIST
        );
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateUserProfileService = async (payload) => {
  try {
    const { phone, email, gender, fullName } = payload;
    if (!phone || !email || !gender || !fullName) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.BAD_REQUEST,
        "Validation Error!"
      );
    } else {
      const findUser = await users.findOne({
        where: {
          phone,
        },
      });
      if (findUser) {
        if (findUser.isAccountDeleted) {
          return rejectResponse(
            statusCode.CLIENT_ERROR.FORBIDDEN,
            responseMessages.ACCOUNT_DELETED
          );
        } else {
          const data = {
            fullName,
            email,
            gender,
            isActive: true,
            isLoggedIn: true,
            updatedAt: new Date(),
          };
          const updateUser = await findUser.update(data);
          if (updateUser) {
            if (payload?.type === "signup") {
              const tokenData = {
                id: updateUser?.id,
                fullName: updateUser?.fullName,
                email: updateUser?.email,
                phone: updateUser?.phone,
                role: updateUser?.roleId,
              };
              const generateTokenResult = generateToken(tokenData);
              const generateRefreshTokenResult = generateToken(tokenData, "7d");
              if (generateTokenResult) tokenData.token = generateTokenResult;
              if (generateRefreshTokenResult) {
                const data = {
                  refreshToken: generateRefreshTokenResult,
                };
                const updateUser = await findUser.update(data);
                if (updateUser) {
                  tokenData.refreshToken = generateRefreshTokenResult;
                }
              }
              return successResponse(
                statusCode.SUCCESS.OK,
                "Profile created Successfully",
                tokenData
              );
            } else {
              return successResponse(
                statusCode.SUCCESS.OK,
                "Profile updated Successfully"
              );
            }
          }
        }
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.NOT_FOUND,
          responseMessages.PHONE_NOT_EXIST
        );
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const signInUser = async (payload) => {
  try {
    const { email, password } = payload;
    const isEmailExist = await users.findOne({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      const decryptUserPassword = decryptText(password);
      const decryptDBPassword = decryptText(isEmailExist?.password);
      if (decryptUserPassword.length && decryptDBPassword.length) {
        if (decryptUserPassword === decryptDBPassword) {
          const updateUser = await isEmailExist.update({
            isLoggedIn: true,
            updatedAt: new Date(),
          });
          if (updateUser) {
            const data = {
              id: isEmailExist?.id,
              fullName: isEmailExist?.fullName,
              email: isEmailExist?.email,
              roleId: isEmailExist?.roleId,
              permissions: isEmailExist?.permissions,
            };
            const findVendor = await vendors.findOne({
              where: {
                userId: isEmailExist?.id,
              },
            });
            if (findVendor) {
              data.isVerified = findVendor?.isVerified;
              data.isDocumentsSubmitted = findVendor?.isDocumentsSubmitted;
            }
            const generateTokenResult = generateToken(data, "");
            if (generateTokenResult) {
              data.token = generateTokenResult;
            }

            return successResponse(statusCode.SUCCESS.OK, "Success!", data);
          }
        } else {
          return rejectResponse(
            statusCode.CLIENT_ERROR.UNAUTHORIZED,
            "Incorrect password! Please try again"
          );
        }
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.CONFLICT,
          "Failed cryptography"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Email doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const signInSendOtpUser = async (payload) => {
  try {
    const { phone } = payload;
    if (!phone) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Phone is required!"
      );
    } else {
      const isPhoneExist = await users.findOne({
        where: {
          phone,
        },
      });
      if (isPhoneExist) {
        if (!isPhoneExist.isActive) {
          return rejectResponse(
            statusCode.CLIENT_ERROR.CONFLICT,
            responseMessages.INCOMPLETE_USER_PROFILE
          );
        } else {
          if (isPhoneExist.isAccountDeleted) {
            return rejectResponse(
              statusCode.CLIENT_ERROR.FORBIDDEN,
              responseMessages.ACCOUNT_DELETED
            );
          } else {
            const code = getRandomNumber(otpStartRange, otpEndRange);
            const data = {
              sentOtp: code,
              updatedAt: new Date(),
            };
            const isMessageSent = await sendCodeInNumber(code, phone);
            if (isMessageSent?.code === 200) {
              const updateUser = await isPhoneExist.update(data);
              if (updateUser) {
                return successResponse(
                  statusCode.SUCCESS.OK,
                  responseMessages.OTP_SENT
                );
              }
            }
          }
        }
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.NOT_FOUND,
          responseMessages.PHONE_NOT_EXIST
        );
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteAccountUser = async (payload) => {
  try {
    const isUserExist = await users.findOne({
      id: payload?.userId,
    });
    if (isUserExist) {
      const data = {
        isAccountDeleted: true,
        isActive: false,
        isLoggedIn: false,
        updatedAt: new Date(),
      };
      const result = await isUserExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Your account has been deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        responseMessages.USER_NOT_EXIST
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const signOutUser = async (payload) => {
  try {
    const isUserExist = await users.findOne({
      id: payload?.userId,
    });
    if (isUserExist) {
      const data = {
        isLoggedIn: false,
        updatedAt: new Date(),
      };
      const result = await isUserExist.update(data);
      if (result) {
        return successResponse(statusCode.SUCCESS.OK, "Logout success!");
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        responseMessages.USER_NOT_EXIST
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const refreshTokenUser = async (payload) => {
  const { refreshToken } = payload;

  if (!refreshToken)
    return rejectResponse(
      statusCode.CLIENT_ERROR.UNAUTHORIZED,
      "Missing refresh token"
    );

  try {
    const userData = verifyToken(refreshToken);

    const findUser = await users.findOne({
      where: {
        phone: userData?.phone,
        isActive: true,
      },
    });

    if (!findUser || findUser.refreshToken !== refreshToken) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.FORBIDDEN,
        "Invalid refresh token"
      );
    }

    const tokenData = {
      id: findUser?.id,
      fullName: findUser?.fullName,
      email: findUser?.email,
      phone: findUser?.phone,
      role: findUser?.roleId,
    };
    const generateTokenResult = generateToken(tokenData);
    const generateRefreshTokenResult = generateToken(tokenData, "7d");
    if (generateToken) tokenData.token = generateTokenResult;
    if (generateRefreshTokenResult) {
      const data = {
        refreshToken: generateRefreshTokenResult,
      };
      const updateUser = await findUser.update(data);
      if (updateUser) {
        tokenData.refreshToken = generateRefreshTokenResult;
      }
      return successResponse(
        statusCode.SUCCESS.OK,
        "Refresh token generated successfully!",
        tokenData
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = {
  signUpSendOtpUser,
  signInUser,
  verifyOtpUser,
  resendOtpUser,
  updateUserProfileService,
  signInSendOtpUser,
  deleteAccountUser,
  signOutUser,
  refreshTokenUser,
};
