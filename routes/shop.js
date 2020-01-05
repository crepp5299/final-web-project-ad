var express = require('express');
const shopController = require('../controller/shop');
var router = express.Router();
var isAuth = require('../middleware/is-auth');
/* GET home page. */
router.get('/add',isAuth, shopController.getAddNewProduct);
router.post('/add',isAuth, shopController.postAddNewProduct);
module.exports = router;
