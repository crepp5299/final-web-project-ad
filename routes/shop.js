var express = require('express');
const shopController = require('../controller/shop');
var router = express.Router();
var isAuth = require('../middleware/is-auth');
/* GET home page. */
router.get('/add', isAuth, shopController.getAddNewProduct);
router.post('/add', isAuth, shopController.postAddNewProduct);

router.get('/edit/:prodId', isAuth, shopController.getEditProduct);
router.post('/edit/:prodId', isAuth, shopController.postEditProduct);

router.get('/delete/:prodId', isAuth, shopController.postDeleteProduct);

router.get('/stalls', isAuth, shopController.getStall);
module.exports = router;
