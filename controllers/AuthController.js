var Users= require('../models/users');
/**
 * Login Page
 */
exports.login= async function(req,res){
    if(req.session.user!=null){
        user=req.session.user;
        res.redirect('/Users/view/'+user._id);
    }
    res.render('login');
}
/**
 * Authenticate User
 * 
 */
exports.authenticate=  async function(req,res){
    if(!req.body.username || !req.body.password){
       res.render('login', {message: "Please enter both id and password"});
    } else {
        user={};
        user.username=req.body.username
        user.password=req.body.password
        Users.findOne({ '_id': user.username , 'password': user.password}, function(err, user) {
            if (err) throw err;
            console.log(user+"Here")
            if(user!=null){
            req.session.user = user;
            req.app.locals.user=req.session.user;
            req.session.user.username = user._id;
            console.log(user);
            res.redirect('/Users/view/'+user._id);
            }else{
                res.render('login', {message: "Invalid credentials!"});
            }
          });
       
    }
}
/**
 * Logout,  destory session.
 */
exports.logout=async function(req,res){
    if(req.session.user!=null){
        req.session.destroy();
        delete req.app.locals.user;
    }
    res.render('login');
}
/**
 * 
 * Autheticate User on each page.
 * 
 */
exports.isAuthenticated= async function (req, res, next){
    if(req.session.user!=null){
        next();
    }
    else{
        res.render('login',{
            message: "Access Denied"
        });
    }
}
/**
 * Check if authorized
 * 
 */

exports.isAuthorized = async function(req,res,next){
    if((req.session.user.access=="admin") || (req.session.user._id==req.params.username)){
        next();
    }
    else
    {
        res.render('error',{
            message: "Access Denied"
        });
    }
}
/**
 * Check if admin
 * 
 */

exports.isAdmin= async function (req,res,next){
    if(req.session.user.access=="admin"){
        next();
    }
    else{
        res.render('error',{
            message: "Access Denied"
        });
    }
}