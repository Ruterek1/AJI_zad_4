module.exports = app => {
  const order_main = require("../controllers/order_main.controller.js");
  const category = require("../controllers/category.controller.js");
  const order_status = require("../controllers/order_status.controller.js");
  const product = require("../controllers/product.controller.js");

  var router = require("express").Router();

  router.get("/products", product.findAll);
  router.get("/products/:id", product.findOne);
  router.post("/products", product.create);
  router.put("/products/:id", product.update);
  router.get("/categories", category.findAll);
  router.get("/orders", order_main.findAll);
  router.post("/orders", order_main.create);
  router.put("/orders/:id/status", order_main.update);
  router.get("/orders/status/:id", order_main.findAllWithState);
  router.get("/status", order_status.findAll);
  
  app.use('/api', router);
};