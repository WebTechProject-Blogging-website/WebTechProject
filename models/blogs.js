var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    user_id: String,
    title: String,
    text: String,
    location: String,
    date_time: Date,
    signature: String,
}, { collection: 'Blogs' });
var Blogs = mongoose.model('Blogs', blogSchema );


module.exports = Blogs;
