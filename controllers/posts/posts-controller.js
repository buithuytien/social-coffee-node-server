import mongoose from "mongoose";

import * as postsDao from './posts-dao.js'

const PostsController = (app) => {
    app.post('/api/posts', createPost);
    app.get('/api/posts', findPosts);
    app.get('/api/posts/author/:uid', findPostsByAuthor);
    app.get('/api/posts/recipe/:rid', findPostsByRecipe);
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

const findPostsByRecipe = async (req, res) => {
    const rid = req.params.rid;
    // try to find post by recipe id, if error, try to find post by recipe_external id, if error, return empty array
    try {
        const posts = await postsDao.findPostByRecipe(rid);
        res.json(posts);
    } catch (e) {
        try {
            const posts = await postsDao.findPostByRecipeExternal(rid);
            res.json(posts);
        } catch (e) {
            res.json([]);
        }
    }
}

const createPost = async (req, res) => {
    const newPost = req.body;
    console.log(newPost)
    // get login user from session, add to post
    const currentUser = req.session['currentUser']
    if (currentUser){
        newPost.author = currentUser._id
    }
    newPost.likes = 0
    // assign date field of newPost to today's date
    newPost.date = new Date();

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

export default PostsController

