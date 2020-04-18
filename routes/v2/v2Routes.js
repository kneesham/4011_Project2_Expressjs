const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1:3000/xfiles";


const getAllPosts = (req, res) => {
    // Returns all posts for all users.
    res.send("getting stuff")
};

const getUsersPosts = (req, res) => {
    // Returns all posts for a specific user, by using their username.
    const userName = req.params.userName;

};

const getPostsById = (req, res) => {
    // returns a specific post by its ID number
    const postId = req.params.postId;

};

const getUsersName = (req, res) => {
    //Returns a specific user's name.
    const userName = req.params.userName;
    res.send("getting the user's name by username\n " + userName + ":name");
};

const v1Router = express.Router();
v1Router.get("/allPosts", getAllPosts);
v1Router.get("/allPosts/:userName", getUsersPosts);
v1Router.get("/posts/:postId", getPostsById);
v1Router.get("/profile/:userName", getUsersName);


module.exports = v1Router;