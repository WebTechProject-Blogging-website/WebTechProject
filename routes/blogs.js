var express = require('express');
var router = express.Router();
var blogs = require('../controllers/BlogController');
var auth = require('../controllers/AuthController');

router.get('/view/:blog_id',auth.isAuthenticated, blogs.view);
router.get('/view/:blog_id/:comment',auth.isAuthenticated, blogs.view);
router.get('/edit/:blog_id',auth.isAuthenticated, blogs.edit);
router.post('/edit/:blog_id',auth.isAuthenticated, blogs.updateBlog)
router.get('/add',auth.isAuthenticated, blogs.add);
router.post('/add',auth.isAuthenticated, blogs.createBlog);
router.get('/',auth.isAuthenticated, blogs.index);
router.get('/admin/',auth.isAuthenticated,auth.isAdmin, blogs.delete)
router.post('/delete/:id',auth.isAuthenticated,auth.isAdmin, blogs.deleteBlog)
router.get('/delete/:id/:success',auth.isAuthenticated,auth.isAdmin, blogs.delete)
module.exports = router;