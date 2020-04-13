const express = require("express");
const axios = require("axios");

const getAllPosts = (req, res) => {
    // Returns all posts for all users.
    const link = "https://jsonplaceholder.typicode.com/posts";

    axios.get(link).then((response) => {
        // get the json from typicode.com
        console.log(response.data);
        res.send(response.data); 
    });
};

const getUsersPosts = (req, res) => {
    // Returns all posts for a specific user, by using their username.
    const userName = req.params.userName;
    let getUsersPosts = "https://jsonplaceholder.typicode.com/posts?userId=";
    const linkToUsers = "https://jsonplaceholder.typicode.com/users";

    axios.get(linkToUsers).then((response) => {
        // get the json from typicode.com
        const BreakException = {};
        try {
            response.data.forEach(user => {
                console.log(user.name); 
                if (user.name === userName) {
                    getUsersPosts += user.id;
                    // console.log(userId);

                    axios.get(getUsersPosts).then((response) => {
                        // get the json from typicode.com
                        console.log(response.data);
                        res.send(response.data); 
                    });
                    throw BreakException;
                }
            });
        }
        catch (e) { if (e !== BreakException) throw e; }
    });
};

const getPostsById = (req, res) => {
    // returns a specific post by its ID number
    const postId = req.params.postId;
    res.send("getting postid: " + postId );
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