import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/social-coffee');

import * as dao from './comments-dao.js'
import * as postsDao from "../posts/posts-dao.js";

const CommentsController = (app) => {
    app.get('/api/comments/', findComments);
    app.get('/api/comments/post/:pid', findCommentsByPost);
    app.post('/api/comments', createComment);
}

const findComments = async (req, res) => {
    const comments = await dao.findComments();
    res.json(comments);
}

const findCommentsByPost = async  (req, res) => {
    const pid = req.params.pid
    const comments = await dao.findCommentsByPost(pid);
    res.json(comments);
}

const createComment = async (req, res) => {
    const newComment = req.body;
    // get login user from session, add to post
    const currentUser = req.session['currentUser']
    newComment.author = currentUser._id
    // newComment.post = post._id
    const insertedComment = await dao.createPost(newComment);
    res.json(newComment);
}