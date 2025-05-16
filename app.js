require("dotenv").config({ path: "./.env" });
const PORT = process.env.SERVER_PORT || 8080;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./api/routes/index");
const { testConnection } = require("./api/db/dbConfig");
testConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});

module.exports = app;
