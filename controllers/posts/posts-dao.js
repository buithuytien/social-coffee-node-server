import postsModel from './posts-model.js';
export const findPost = () => postsModel.find();
export const findPostByAuthor = (uid) => postsModel.find({author: uid})
export const createPost = (post) => postsModel.create(post);
export const deletePost = (pid) => postsModel.deleteOne({_id: pid});
export const updatePost = (pid, post) => postsModel.updateOne({_id: pid}, {$set: post})