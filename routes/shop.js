var express = require('express');
const shopController = require('../controller/shop');
var router = express.Router();

/* GET home page. */
router.get('/add', shopController.getAddNewProduct);
router.post('/add', shopController.postAddNewProduct);
module.exports = router;
