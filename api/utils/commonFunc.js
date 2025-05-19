const jwt = require("jsonwebtoken");
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
  const token = jwt.sign(data, process.env.TOKEN_SECRET, {
    expiresIn,
  });
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

module.exports = {
  getRandomNumber,
  generateToken,
  verifyToken,
};
