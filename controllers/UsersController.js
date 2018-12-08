var Users= require('../models/users');

exports.view =async function(req,res){
    console.log("user");
    user=req.params.username;
    // find all athletes that play tennis
    Users.findOne({ '_id': user}, function(err, user) {
        if (err) throw err;
      
        // show the one user
        console.log(user);
        res.render('Users/view',{
            username: user
        })
      });
   
}
exports.admin = async function(req,res){
    id=req.params.id;
    Users.find({},function(err, output) {
        if (err) throw err;
        console.log(output);
        if(req.params.success=="success"){
            message="Successfully deleted user:"+id;
            res.render('Users/delete',{
                records: output,
                message:message
            });
        }
        if(req.body.message!=null){
            res.render('Users/delete',{
                records: output,
                message: req.body.message
            });
        }
        res.render('Users/delete',{
            records: output
        })
      });
}

exports.createUser = async function(req,res){
    username=req.body.username;
    password=req.body.password;
    access= req.body.access;
    if(username=="" || password=="" || access=="" ){
        res.render('signup',{
            message:"Please enter all required parameters"
        });
    }
    Users.create({_id: username, password: password,access: "user"}, function(err,result){
        if(err==null){
            err="Successfully created user: "+username;
            //mongoose.connection.close();
        }
        res.render('signup',{
            message:err
        });
    });
}

exports.edit= async function(req,res){
    console.log("user");
    user=req.params.username;
    // find all athletes that play tennis
    Users.findOne({ '_id': user}, function(err, user) {
        if (err) throw err;
      
        // show the one user
        console.log(user);
        res.render('Users/edit',{
            username: user
        })
      });
   
}

exports.updateUser =async function(req,res){
    console.log("user");
    username=req.body.username;
    password=req.body.password;
    Users.update(
        { _id: username },
        {
          $set: {
            password: password
            // Mongoose will add `updatedAt`
          }
        }
     , function(err, user) {
        if (err) throw err;
        // show the one user
        username=req.session.user._id;
        console.log(username);
        res.redirect('/users/view/'+username);
     });
   
}
exports.signup = async function(req,res){
    res.render('signup');
}

exports.addAdmin = async function(req,res){
    console.log("user");
    username=req.params.id;
    Users.update(
        { _id: username },
        {
          $set: {
            access: "admin"
            // Mongoose will add `updatedAt`
          }
        }
     , function(err, user) {
        if (err) throw err;
        // show the one user
        //username=req.session.user._id;
        req.body.message="Admin added "+username;
        console.log(username);
        exports.admin(req,res);
     });
}

exports.removeAdmin = async function(req,res){
    username=req.params.id;
    Users.update(
        { _id: username },
        {
          $set: {
            access: "user"
            // Mongoose will add `updatedAt`
          }
        }
     , function(err, user) {
        if (err) throw err;
        // show the one user
        //username=req.session.user._id;
        req.body.message="Admin removed "+username;
        console.log(username);
        exports.admin(req,res);
     });
}

exports.delete= async function(req,res){
    username=req.params.id;
    req.params.success="not-success";
    if(username==req.session.user._id){
        req.body.message="You can't delete yourself, Lol.";
        exports.admin(req,res);
    }else{
    Users.deleteOne(
        { _id: username }
     , function(err, user) {
        if (err) throw err;
        // show the one user
        //username=req.session.user._id;
        req.body.message="Deleted User: "+username;
        console.log(username);
        exports.admin(req,res);
     });
    }
}