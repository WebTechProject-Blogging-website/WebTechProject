var Comments= require('../models/comments');


module.exports ={
    viewAll: viewAll,
    add: add
}
function viewAll(blog_id,callback){
    Comments.find({ 'blog_id': blog_id}, function(err, output) {
        if (err) throw err;
        // show the one user
        console.log(output);
        callback(err,output)
      });
}

async function add(req,res){
    user_id= req.session.user._id;
    title= req.body.title;
    text= req.body.text;
    date= req.body.date;
    blog_id=req.params.blog_id;
    Comments.create({ 'blog_id': blog_id,'user_id':user_id,'title':title,'text':text,'date_time':date}, function(err,output){
        if (err) throw err;
        // show the one user
        console.log(output);
        res.redirect('/Blogs/view/'+blog_id+'/success#success');
    });
}