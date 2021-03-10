const express = require("express");
const router = express.Router();

//imports controllers
const productController = require("../controllers/productController");

//index
router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "Node api Rest",
    version: "0.0.2",
  });
});

//produtos
router.get("/products", productController.post);
router.post("/products", productController.post);
router.put("/products/:id", productController.put);
router.delete("/products", productController.delete);

module.exports = router;
