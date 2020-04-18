const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("../../lib/middleware/bodyParser");
const mongoUrl = "mongodb://127.0.0.1:27017/project2";
const UserPost = require("./UserPost");
const User = require("./user");

const makePost = async (req, res) => {
    // creates a new post for a specific user

    console.log(req.body);
    try {
        mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true} );
        const userPost = new UserPost(req.body);
        const results = await userPost.save();
        res.send(results);
        mongoose.disconnect(mongoUrl);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        res.send(error);
    }
}

const editPost = async (req, res) => {
    // updates a specific post

    const postId = req.params.postId;
    
    try {
        mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true} );
        const post_Id = await UserPost.find({id: postId});
        // used to get the long _id
        console.log(post_Id[0]._id);

        const postsToEdit = await UserPost.findById(post_Id[0]._id).exec();
        postsToEdit.set(req.body);
        const result = await postsToEdit.save();
        res.send( result );
        mongoose.disconnect(mongoUrl);
    }
    catch (error) {
        console.error("error: ", error);
        res.status(500);
        res.send(error);
    } 
}

const deletePost = async (req, res) => {
    // removes a particular post
    const postId = req.params.postId;
    try {
        mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true} );
        const results = await UserPost.deleteOne({ _id: postId }).exec();
        res.send(results);
        mongoose.disconnect(mongoUrl);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        res.send(error);
    }

}

const getAllPosts = async (req, res) => {
    // Returns all posts for all users.

    try {
        mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true} );
        const results = await UserPost.find().exec();
        res.send(results);
        mongoose.disconnect(mongoUrl);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        res.send(error);
    }
};

const getUsersPosts = async (req, res) => {
    // Returns all posts for a specific user, by using their username.
    const userName = req.params.userName;

    try {
        mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true} );
        const user = await User.find({username: userName});
        const userId = user[0].id;
        const userPosts = await UserPost.find({userId: userId})
        res.send(userPosts);
        mongoose.disconnect(mongoUrl);
    }
    catch (error) {
        console.error("error: ", error);
        res.status(500);
        res.send(error);
    } 

};

const getPostsById = async (req, res) => {
    // returns a specific post by its ID number
    const postId = req.params.postId;
    
    try {
        mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true} );
        const post_Id = await UserPost.find({id: postId});
        // used to get the long _id

        const postsToReturn = await UserPost.findById(post_Id[0]._id).exec();
        res.send( postsToReturn );
        mongoose.disconnect(mongoUrl);
    }
    catch (error) {
        console.error("error: ", error);
        res.status(500);
        res.send(error);
    } 
};

const getUsersName = async (req, res) => {
    //Returns a specific user's name.
    const userName = req.params.userName;

    try {
        mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true} );
        const result = await User.find({username: userName});

        res.send( "That user's name is: " + result[0].name );
        mongoose.disconnect(mongoUrl);
    }
    catch (error) {
        console.error("error: ", error);
        res.status(500);
        res.send(error);
    } 
};

const v2Router = express.Router();

v2Router
.route("/allPosts")
.get(getAllPosts);

v2Router
.route("/allPosts/:userName")
.get(getUsersPosts);

v2Router
.route("/profile/:userName")
.get(getUsersName);

v2Router
.route("/posts")
.post(bodyParser.json(), makePost);

v2Router
.route("/posts/:postId")
.get(getPostsById)
.patch(bodyParser.json(), editPost)
.delete(deletePost);

module.exports = v2Router;