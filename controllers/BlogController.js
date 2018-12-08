var Blogs= require('../models/blogs');
var CommentsController= require('../controllers/CommentsController');
var async=require('async');   
exports.index = async function(req,res){
    Blogs.find({},function(err, output) {
        if (err) throw err;
        console.log(output);
        res.render('Blogs/index',{
            records: output
        })
      });
}

function viewOne(blog_id,callback){
    Blogs.findOne({ '_id': blog_id}, function(err, output) {
        if (err) throw err;
        callback(err,output);
      });
}

exports.view =async function(req,res){
    blog_id=req.params.blog_id;
    async.parallel({
        blog: async.apply(viewOne,blog_id),
        comments: async.apply(CommentsController.viewAll, blog_id)
    },function(err, result) {
        if (err) throw err;
        console.log(result);
        if((req.params.comment!='undefined') & (req.params.comment=="success")){
            res.render('Blogs/view',{
                blog: result["blog"],
                comments: result["comments"],
                user: req.session.user._id,
                message: "Comment Successful"
            })
        }
        res.render('Blogs/view',{
            blog: result["blog"],
            comments: result["comments"],
            user: req.session.user._id,
            message: "Add a comment!"
        })
      });
}

exports.edit =async function(req,res){
    blog_id=req.params.blog_id;
    Blogs.findOne({ '_id': blog_id}, function(err, output) {
        if (err) throw err;
        console.log(output);
        res.render('Blogs/edit',{
            blog: output
        })
      });
}

exports.updateBlog = async function(req,res){
    console.log("user");
    blog_id=req.params.blog_id;
    blog=req.body;
    // find all athletes that play tennis
    if((blog["user_id"]==req.session.user._id)||(req.session.user.access=="admin"))
    {
    Blogs.update(
        { _id: blog_id },
        {
          $set: {
              title: blog["title"],
              text: blog["text"],
              signature: blog["signature"],
              date_time: blog["date_time"]
          }
        }
     , function(err, user) {
        if (err) throw err;
        // show the one user
        res.redirect('/blogs/view/'+blog_id);
     });
    }else{
        res.render('error',{
            message: "Don't edit what's not yours!"
        })
    }
}

exports.add = async function(req,res){
    username=req.session.user._id;
    res.render('Blogs/add',{
        username: username
    });
}

exports.createBlog = async function(req,res){
    user_id= req.session.user._id;
    title= req.body.title;
    text= req.body.text;
    location= req.body.location;
    date= req.body.date;
    date_time= new Date(date);
    signature= req.body.signature;
    Blogs.create({user_id: user_id,title: title, text: text, location:location,date_time,signature: signature}, function(err,result){
        if(err==null){
            err="Successfully created Blog Post: "+title;
            //mongoose.connection.close();
        }
        res.render('Blogs/add',{
            message: err
        });
    });
}

exports.delete = async function(req,res){
    id=req.params.id;
    Blogs.find({},function(err, output) {
        if (err) throw err;
        console.log(output);
        if(req.params.success=="success"){
            message="Successfully deleted record:"+id;
            res.render('Blogs/delete',{
                records: output,
                message:message
            });
        }
        res.render('Blogs/delete',{
            records: output
        })
      });
}

exports.deleteBlog = async function(req,res){
    id=req.params.id;
    Blogs.deleteOne({'_id':id},function(err,output){
        if(err) throw err;
        res.redirect('/Blogs/delete/'+id+'/success#success')
    })
}
/*
exports.updateBlog =async function(req,res){
    console.log("blog");
    username=req.session.user.username;
    // find all athletes that play tennis
    Blogs.update(
        { username: username },
        {
          $set: {
            password: password
            // Mongoose will add `updatedAt`
          }
        }
     , function(err, user) {
        if (err) throw err;
        // show the one user
        console.log(username);
        res.redirect('/users/view/'+username);
     });
   
}
*/
