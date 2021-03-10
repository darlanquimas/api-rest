"use strict";

const http = require("http");
const debug = require("debug")("apirest:server");
const express = require("express");

const app = express();
const port = normalizePort(process.env.PORT || 5000);
app.set("port", port);

const server = http.createServer(app);
const router = express.Router();

const route = router.get("/", (req, res, bext) => {
  res.status(200).send({
    title: "Node Api",
    version: "0.0.1",
  });
});

app.use("/", router);

server.listen(port);
server.on("error", onError);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " Requires elevated privileges");
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      break;
    default:
      throw error;
  }
}
