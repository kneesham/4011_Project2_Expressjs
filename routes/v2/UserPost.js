const mongoose = require("mongoose");

const UserPost = mongoose.model("posts", {
    userId: Number,
    id: Number,
    title: String,
    body: String
});

module.exports = UserPost;