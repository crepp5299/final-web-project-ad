var express = require("express");
var router = express.Router();

/* GET home page. */
var productss = [
  {
    image: "/assets/images/product-01.jpg",
    name: "Áo hoodle 1",
    stock: 69,
    price: "$313"
  },
  {
    image: "/assets/images/product-01.jpg",
    name: "Áo hoodle 2",
    stock: 68,
    price: "$312"
  },
  {
    image: "/assets/images/product-01.jpg",
    name: "Áo hoodle 3",
    stock: 67,
    price: "$311"
  }
];

router.get("/", function(req, res, next) {
  res.render("ecommerce-products", {
    title: "Sản phẩm của gian hàng",
    productss: productss,
    user: req.user
  });
});

module.exports = router;
