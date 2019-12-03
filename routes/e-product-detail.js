var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("ecommerce-product-detail", {
    title: "Chi tiết sản phẩm",
    user: req.user
  });
});

module.exports = router;
