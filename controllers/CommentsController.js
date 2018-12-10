var Comments= require('../models/comments');


module.exports ={
    viewAll: viewAll,
    add: add
}
/**
 * Fetch all blog post comments
 */
function viewAll(blog_id,callback){
    Comments.find({ 'blog_id': blog_id}, function(err, output) {
        if (err) throw err;
        console.log(output);
        callback(err,output)
      });
}
/**
 * Add blog post comments
 */
async function add(req,res){
    user_id= req.session.user._id;
    text= req.body.text;
    date= req.body.date;
    blog_id=req.params.blog_id;
    Comments.create({ 'blog_id': blog_id,'user_id':user_id,'text':text,'date_time':date}, function(err,output){
        if (err) throw err;
        console.log(output);
        res.redirect('/Blogs/view/'+blog_id+'/success#success');
    });
}