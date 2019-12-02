var express = require("express");
const userController = require("../controller/user");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Trang chính" });
});

router.get("/login", userController.getLogin);

module.exports = router;
