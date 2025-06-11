require("dotenv").config({ path: "./.env" });
const PORT = process.env.SERVER_PORT || 8080;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./api/routes/index");
const cron = require('node-cron');
const { testConnection } = require("./api/db/dbConfig");
const { syncShopifyProducts } = require("./api/shopify/shopifyDBSync");
testConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", routes);



cron.schedule('* * * * *', async () => {
  try {
    console.log(`Task running at ${new Date().toISOString()}`);
    // const result = await syncShopifyProducts();
    // console.log('Sync completed:', result);
  } catch (error) {
    console.error('Error during sync:', error);
  }
});


app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});

module.exports = app;
