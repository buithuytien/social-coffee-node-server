import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/social-coffee');

import * as postsDao from './posts-dao.js'

const PostsController = (app) => {
    app.post('/api/posts', createPost);
    app.get('/api/posts', findPosts);
    app.get('/api/posts/author/:uid', findPostsByAuthor);
    app.put('/api/posts/:pid', updatePost);
    app.delete('/api/posts/:pid', deletePost);
}

const findPosts = async (req, res) => {
    const posts = await postsDao.findPost();
    res.json(posts)
}

const findPostsByAuthor = async (req, res) => {
    const uid = req.params.uid;
    const posts = await postsDao.findPostByAuthor(uid);
    console.log(posts);
    res.json(posts)
}

const createPost = async (req, res) => {
    const newPost = req.body;
    // get login user from session, add to post
    const currentUser = req.session['currentUser']
    newPost.author = currentUser._id
    console.log("from node server, createpost post-controller, print new post");
    console.log(newPost);
    const insertedPost = await postsDao.createPost(newPost);
    res.json(insertedPost);
}

const deletePost = async (req, res) => {
    const postIdToDelete = req.params.pid;
    const status = await postsDao.deletePost(postIdToDelete);
    res.json(status)
}

const updatePost = async (req, res) => {
    const postIdToUpdate = req.params.pid;
    const updates = req.bodyl
    const status = await postsDao.updatePost(postIdToUpdate, updates);
    res.json(status);
}


