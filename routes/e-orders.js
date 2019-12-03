var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("ecommerce-orders", {
    title: "Danh sách đặt hàng",
    user: req.user
  });
});

module.exports = router;
