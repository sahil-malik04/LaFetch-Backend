const multer = require("multer");

const storage = multer.memoryStorage(); // Buffer uploads in memory
const upload = multer({ storage });

module.exports = upload;
