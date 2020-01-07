var express = require('express');
const userController = require('../controller/user');
const shopController = require('../controller/shop');
var router = express.Router();
var isAuth = require('../middleware/is-auth');
/* GET home page. */
//router.get("/", isAuth, userController.getIndex);

router.get('/login', userController.getLogin);

router.post('/login', userController.postLogin);

router.get('/', isAuth, shopController.getDashboard);
router.get('/dashboard', isAuth, shopController.getDashboard);

router.get('/add-account', isAuth, userController.getAddAccount);

router.post('/add-account', isAuth, userController.postAddAccount);

router.get('/stalls', isAuth, shopController.getMyProducts);

router.get('/logout', isAuth, userController.getLogout);

module.exports = router;
