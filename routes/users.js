var express = require("express");
const userController = require("../controller/user");
var router = express.Router();

/* GET users listing. */
router.get("/", userController.getUser);

router.get("/edit-user/:userId", userController.getEditUser);

router.post("/edit-user/:userId", userController.postEditUser);

router.get("/delete/:userId", userController.deleteUser);

module.exports = router;
