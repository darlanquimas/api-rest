const express = require("express");
const bodyParser = require("body-parser");
require("dotenv/config");

const mongoose = require("mongoose");

const app = express();
const router = express.Router();

//conexão ao mongoDb
mongoose.connect(process.env.CONNECTIONSTRING);

const Product = require("./models/product");

//carregamento de rotas
const routes = require("./routes/router");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("/", routes);

module.exports = app;
