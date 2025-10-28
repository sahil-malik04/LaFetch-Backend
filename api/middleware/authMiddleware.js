const users = require("../models/userModel");
const { verifyToken } = require("../utils/commonFunc");
const { rejectResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");

const isAuthorized = async (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) {
    return res.status(statusCode.CLIENT_ERROR.UNAUTHORIZED).send({
      status: statusCode.CLIENT_ERROR.UNAUTHORIZED,
      message: "Unauthorized!",
    });
  }

  try {
    const splitToken = token.split(" ")[1];
    const authData = verifyToken(splitToken);

    if (!authData || (!authData.phone && !authData.email)) {
      return res.status(statusCode.CLIENT_ERROR.UNAUTHORIZED).send({
        status: statusCode.CLIENT_ERROR.UNAUTHORIZED,
        message: "Invalid token payload!",
      });
    }
    const userWhereClause =
      authData.role === 3
        ? { phone: authData.phone }
        : { email: authData.email };

    const isAccountDeleted = await users.findOne({
      where: {
        ...userWhereClause,
        isAccountDeleted: true,
      },
    });

    if (isAccountDeleted) {
      return res.status(statusCode.CLIENT_ERROR.FORBIDDEN).send({
        status: statusCode.CLIENT_ERROR.FORBIDDEN,
        message:
          "Access denied. Your account is no longer active. Please contact the administrator.",
      });
    }

    const isAccountActive = await users.findOne({
      where: {
        ...userWhereClause,
        ...(authData.role === 3 && { isActive: true }),
      },
    });

    if (isAccountActive) {
      req.user = authData;
      next();
    } else {
      return res.status(statusCode.CLIENT_ERROR.UNAUTHORIZED).send({
        status: statusCode.CLIENT_ERROR.UNAUTHORIZED,
        message: "Your account is currently inactive. Please contact support.",
      });
    }
  } catch (err) {
    return res
      .status(statusCode.CLIENT_ERROR.UNAUTHORIZED)
      .send(rejectResponse(statusCode.CLIENT_ERROR.UNAUTHORIZED, err?.message));
  }
};

module.exports = {
  isAuthorized,
};
