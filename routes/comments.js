var express = require('express');
var router = express.Router();
var comments = require('../controllers/CommentsController');
var auth = require('../controllers/AuthController');

router.post('/add/:blog_id',auth.isAuthenticated, comments.add);

module.exports = router;