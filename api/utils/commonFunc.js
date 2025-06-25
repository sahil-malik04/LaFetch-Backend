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

const decryptText = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.CRYPT_SECRET);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

const identifyGender = (genderParam) => {
  let genderFilter;
  if (genderParam === "1") {
    genderFilter = "men";
  } else if (genderParam === "2") {
    genderFilter = "women";
  } else if (genderParam === "3") {
    genderFilter = "accessories";
  }
  return genderFilter;
};

module.exports = {
  getRandomNumber,
  generateToken,
  verifyToken,
  decryptText,
  identifyGender
};
