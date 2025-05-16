const jwt = require("jsonwebtoken");
// Function to get random number
const getRandomNumber = (start, end) => {
  try {
    const randomNumber = Math.floor(start + Math.random() * end);
    return randomNumber;
  } catch (error) {
    throw error;
  }
};

const generateToken = (data) => {
  const token = jwt.sign(data, process.env.TOKEN_SECRET);
  return token;
};

module.exports = {
  getRandomNumber,
  generateToken,
};
