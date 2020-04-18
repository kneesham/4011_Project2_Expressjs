
/*********************************************
 * Name: Ted Nesham
 * Date: 4-17-2020
 * Class: Cs_4011
 * *******************************************/

const express = require("express");
const axios = require("axios");

const getAllPosts = (req, res) => {
    // Returns all posts for all users.
    const link = "https://jsonplaceholder.typicode.com/posts";

    axios.get(link).then((response) => {
        // get the json from typicode.com
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

                if (user.name === userName) {
                    getUsersPosts += user.id;
                    // add the userid so that we can identify each post for a given user.

                    axios.get(getUsersPosts).then((response) => {
                        // get the json from typicode.com
                        console.log(response.data);
                        res.send(response.data); 
                    });
                    throw BreakException;
                    // Because there is no need to keep searching.
                }
            });
        }
        catch (e) { if (e !== BreakException) throw e; }
        // catch any other exceptions that are not the break.
    });
};

const getPostsById = (req, res) => {
    // returns a specific post by its ID number
    const postId = req.params.postId;
    const link = "https://jsonplaceholder.typicode.com/posts?id=" + postId;

    axios.get(link).then((response) => {
        // get the json from typicode.com
        // console.log(response.data);
        res.send(response.data); 
    });
};

const getUsersName = (req, res) => {
    //Returns a specific user's name.
    const userName = req.params.userName;
    const link = "https://jsonplaceholder.typicode.com/users?username=" + userName;

    axios.get(link).then((response) => {
        // get the json from typicode.com
        res.send(response.data[0].name); 
    });
};

const v1Router = express.Router();
v1Router.get("/allPosts", getAllPosts);
v1Router.get("/allPosts/:userName", getUsersPosts);
v1Router.get("/posts/:postId", getPostsById);
v1Router.get("/profile/:userName", getUsersName);
// create each route needed for the project.

module.exports = v1Router;
// export the router.