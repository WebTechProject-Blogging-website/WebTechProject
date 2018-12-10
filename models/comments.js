var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;
var commentsSchema = new Schema({
    blog_id: ObjectId,
    user_id: String,
    date_time: Date,
    text: String,
}, { collection: 'Comments' });
var Comments = mongoose.model('Comments', commentsSchema );


module.exports = Comments;
