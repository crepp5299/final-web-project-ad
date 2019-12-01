var express = require("express");
var router = express.Router();
const userController = require("../controller/user");

/* GET users listing. */
router.get("/", userController.getUser);

module.exports = router;
