var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("ecommerce-product-edit", {
    title: "Thêm/thay đổi sản phẩm",
    user: req.user
  });
});

module.exports = router;
