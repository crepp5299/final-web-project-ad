var express = require("express");
const userController = require("../controller/user");
var router = express.Router();

/* GET home page. */
router.get("/", userController.getIndex);

router.get("/login", userController.getLogin);

router.post("/login", userController.postLogin);

router.get("/add-account", userController.getAddAccount);

router.post("/add-account", userController.postAddAccount);

router.get("/logout", userController.getLogout);

module.exports = router;
