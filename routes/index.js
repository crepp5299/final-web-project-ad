var express = require("express");
const userController = require("../controller/user");
var router = express.Router();

/* GET home page. */
router.get("/", userController.getIndex);

router.get("/login", userController.getLogin);

router.post("/login", userController.postLogin);

router.get("/create-account", userController.getSignUp);

router.post("/create-account", userController.postSignUp);

module.exports = router;
