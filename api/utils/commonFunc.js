// Function to get random number
const getRandomNumber = (start, end) => {
  try {
    const randomNumber = Math.floor(start + Math.random() * end);
    return randomNumber;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRandomNumber,
};
