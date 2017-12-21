const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});

const profileSchema = new mongoose.Schema({
    username: String,
    displayname: String, // changed
    headline: String,
    following: [String],
    email: String,
    dob: String,
    zipcode: String,
    avatar: String,
    phone: String // changed
});

const commentSchema = new mongoose.Schema({
    commentId: String,
    text: String,
    date: Date,
    author: String
});

const articleSchema = new mongoose.Schema({
    author: String,
    img: String,
    text: String,
    date: Date,
    comments: [commentSchema],
    id: string, // changed
    display: Boolean // changed
});

exports.User = mongoose.model("User", userSchema);
exports.Profile = mongoose.model("Profile", profileSchema);
exports.Comment = mongoose.model('Comment', commentSchema);
exports.Article = mongoose.model('Article', articleSchema);