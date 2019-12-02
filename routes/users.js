var express = require("express");
const userController = require("../controller/user");
var router = express.Router();

/* GET users listing. */
router.get("/", userController.getUser);

module.exports = router;
