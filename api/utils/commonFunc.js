const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const fs = require("fs");
const path = require("path");
const { GoogleAuth } = require("google-auth-library");
const { scopes } = require("./dataUtils");
const serviceAccountPath = path.join(
  __dirname,
  "../../public/la-fetch-3b250-firebase-adminsdk-sf4o8-4482689bce.json"
);

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
// Function to get random number
const getRandomNumber = (start, end) => {
  try {
    const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
    return randomNumber;
  } catch (error) {
    throw error;
  }
};

const generateToken = (data, expiresIn) => {
  const options = expiresIn ? { expiresIn } : {};
  const token = jwt.sign(data, process.env.TOKEN_SECRET, options);
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  } catch (error) {
    throw error;
  }
};

const encryptText = (text) => {
  const ciphertext = CryptoJS.AES.encrypt(
    text,
    process.env.CRYPT_SECRET
  ).toString();
  return ciphertext;
};

const decryptText = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.CRYPT_SECRET);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

const generatePassword = (length = 10) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
};

const getAccessToken = async () => {
  const auth = new GoogleAuth({
    credentials: serviceAccount,
    scopes: [scopes],
  });
  const client = await auth.getClient();
  const accessTokenResponse = await client.getAccessToken();
  return accessTokenResponse.token;
};

const sendPushNotification = async (token, title, body, image, data = {}) => {
  try {
    const accessToken = await getAccessToken();
    const projectId = process.env.FB_PROJECT_ID;

    const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

    const payload = {
      message: {
        token,
        notification: {
          title,
          body,
          image,
        },
        data,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getRandomNumber,
  generateToken,
  verifyToken,
  decryptText,
  generatePassword,
  encryptText,
  sendPushNotification,
};
