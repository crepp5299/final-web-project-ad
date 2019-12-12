var express = require("express");
const userController = require("../controller/user");
var router = express.Router();

/* GET users listing. */
router.get("/", userController.getUser);
router.get("/:userId", userController.getEditUser);
router.post("/:userId", userController.postEditUser);

module.exports = router;
