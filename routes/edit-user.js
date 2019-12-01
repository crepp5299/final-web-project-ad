var express = require('express');
var router = express.Router();

/* GET home page. */
var info = {
  ho: "Nguyen Van",
  ten: " A",
  email: "donaldtrump@whitehouse.com",
  sdt: "113",
  diachi: "Meox"
};

router.get('/', function(req, res, next) {
  res.render('ecommerce-user-edit', { title: 'Thay đổi thông tin người dùng' , info:info});
});

module.exports = router;
