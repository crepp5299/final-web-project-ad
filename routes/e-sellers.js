var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("ecommerce-seller", {
    title: "Danh sách gian hàng",
    user: req.user
  });
});

module.exports = router;
