const { default: axios } = require("axios");

// Authenticate with Shiprocket
const SHIPROCKET_BASE_URL = process.env.SHIPROCKET_BASE_URL;
const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL;
const SHIPROCKET_PAAS = process.env.SHIPROCKET_PASSWORD;

const authenticateShiprocket = async () => {
  const { data: loginRes } = await axios.post(
    `${SHIPROCKET_BASE_URL}/auth/login`,
    {
      email: SHIPROCKET_EMAIL,
      password: SHIPROCKET_PAAS,
    }
  );

  return loginRes;
};

const placeShiprocket = async (shiprocketOrderPayload, shiprocketToken) => {
  const { data: shiprocketOrderRes } = await axios.post(
    `${SHIPROCKET_BASE_URL}/orders/create/adhoc`,
    shiprocketOrderPayload,
    {
      headers: {
        Authorization: `Bearer ${shiprocketToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return shiprocketOrderRes;
};

const cancelShiprocketOrder = async (cancelPayload, shiprocketToken) => {
  const { data: shiprocketOrderRes } = await axios.post(
    `${SHIPROCKET_BASE_URL}/orders/cancel`,
    cancelPayload,
    {
      headers: {
        Authorization: `Bearer ${shiprocketToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return shiprocketOrderRes;
};

const returnShiprocketOrder = async (
  shiprocketOrderPayload,
  shiprocketToken
) => {
  const { data: shiprocketOrderRes } = await axios.post(
    `${SHIPROCKET_BASE_URL}/orders/create/return`,
    shiprocketOrderPayload,
    {
      headers: {
        Authorization: `Bearer ${shiprocketToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return shiprocketOrderRes;
};

module.exports = {
  authenticateShiprocket,
  placeShiprocket,
  cancelShiprocketOrder,
  returnShiprocketOrder,
};
