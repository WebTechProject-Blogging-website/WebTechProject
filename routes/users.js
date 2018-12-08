var express = require('express');
var router = express.Router();
var users = require('../controllers/UsersController');
var auth = require('../controllers/AuthController');

/* GET users listing. */
router.get('/login', auth.login);
router.post('/login', auth.authenticate);
router.get('/logout', auth.logout);
router.get('/signup', users.signup);
router.post('/signup', users.createUser);
router.get('/admin',auth.isAuthenticated,auth.isAdmin, users.admin);
//router.get('/admin/:id',auth.isAuthenticated,auth.isAdmin, users.delete);
/**
 * Admin Add and Remove
 * 
 */
router.post('/admin/add/:id', auth.isAuthenticated,auth.isAdmin, users.addAdmin);
router.post('/admin/remove/:id',auth.isAuthenticated,auth.isAdmin,users.removeAdmin);
router.post('/delete/:id', auth.isAuthenticated,auth.isAdmin,users.delete);
/** */
//router.get('/', users.index);
router.get('/view/:username', auth.isAuthenticated, auth.isAuthorized, users.view);
router.get('/edit/:username', auth.isAuthenticated, auth.isAuthorized, users.edit);
router.post('/edit/:username', auth.isAuthenticated, auth.isAuthorized, users.updateUser);
//router.get('/edit/:username', users.edit);
//router.get('/delete/:username', users.delete);
//router.get('/add/:username', users.add);

module.exports = router;
