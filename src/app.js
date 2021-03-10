const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

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
