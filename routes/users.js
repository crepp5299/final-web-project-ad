var express = require('express');
const userController = require('../controller/user');
var router = express.Router();
var isAuth = require('../middleware/is-auth');
/* GET users listing. */
router.get('/', isAuth, userController.getUser);

router.get('/edit-user/:userId*?', isAuth, userController.getEditUser);

router.post('/edit-user/:userId*?', isAuth, userController.postEditUser);

router.get('/delete/:userId', isAuth, userController.deleteUser);

router.get('/lock/:userId', isAuth, userController.lockUser);

router.get('/unlock/:userId', isAuth, userController.unlockUser);

module.exports = router;
