const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
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

module.exports = {
  getRandomNumber,
  generateToken,
  verifyToken,
  decryptText,
  generatePassword,
  encryptText,
};
