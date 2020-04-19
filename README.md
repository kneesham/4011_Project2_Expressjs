### v1: In this version, you need to write a wrapper around https://jsonplaceholder.typicode.com/. In this version, you need only to implement:

- GET: /localhost:3000/v1allPosts -> Returns all posts for all users.
- GET: localhost:3000/v1/allPosts/<username> -> Returns all posts for a specific user, by using their username.
- GET: localhost:3000/v1/posts/<postid> -> returns a specific post by its ID number
- GET: localhost:3000/v1/profile/<username> -> Returns a specific user's name.

### v2: In this version, you'll need to write access a database so that all of the data are not coming from jsonplaceholder but from your own local mongo instance (which we will cover in class how to set up and use):
- GET: localhost:3000/v2/allPosts -> Returns all posts for all users.
- GET: localhost:3000/v2/allPosts/<username> -> Returns all posts for a specific user, by using their username.
- GET: localhost:3000/v2/posts/<postid> -> returns a specific post by its ID number
- GET: localhost:3000/v2/profile/<username> -> Returns a specific user's username.
- POST: localhost:3000/v2/posts -> creates a new post for a specific user
- PATCH: localhost:3000/v2/posts/<id> -> updates a specific post
- DELETE: localhost:3000/v2/posts/<postid> -> removes a particular post
