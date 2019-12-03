var express = require("express");
var router = express.Router();

/* GET home page. */
var summary = [
  { date: "1/1/2019", sell: 69, income: "$999", benefit: "$313" },
  { date: "2/1/2019", sell: 99, income: "$999", benefit: "$313" }
];

router.get("/", function(req, res, next) {
  res.render("ecommerce-summary", {
    title: "Thống kê",
    summary: summary,
    user: req.user
  });
});

module.exports = router;
