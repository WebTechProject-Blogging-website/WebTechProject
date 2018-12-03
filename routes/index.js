var express = require('express');
var router = express.Router();
var auth = require('../controllers/AuthController');

/* GET users listing. */

/** */
//router.get('/', users.index);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/contact',auth.isAuthenticated, function(req, res, next) {
  res.render('contact');
});

module.exports = router;
