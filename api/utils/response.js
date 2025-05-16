const rejectResponse = (status, message) => {
  return {
    status,
    message,
  };
};

const successResponse = (status, message, data) => {
  return {
    status,
    message,
    data,
  };
};

module.exports = {
  rejectResponse,
  successResponse,
};
