import mongoose from "mongoose";

import * as dao from './comments-dao.js'

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
    if (currentUser){
        newComment.author = currentUser._id
    }
    // newComment.post = post._id
    const insertedComment = await dao.createComment(newComment);
    res.json(insertedComment);
}

export default CommentsController