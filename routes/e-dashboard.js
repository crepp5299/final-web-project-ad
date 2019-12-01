var express = require('express');
var router = express.Router();

/* GET home page. */
var top10product = [
  { image: "/assets/images/product-01.jpg", name: "Áo hoodle 1", count: 69, price: "$313" },
  { image: "/assets/images/product-01.jpg", name: "Áo hoodle 2", count: 68, price: "$312" },
  { image: "/assets/images/product-01.jpg", name: "Áo hoodle 3", count: 67, price: "$311" }
];

var top10seller = [{ name: "1712767", count: 69, income: "$313" }, { name: "ahaha", count: 68, income: "$312" }, { name: "ahuhu", count: 67, income: "$311" }];

router.get('/', function(req, res, next) {
  res.render('ecommerce-dashboard', { title: 'Bảng tổng quát' ,top10product : top10product, top10seller : top10seller});
});

module.exports = router;
