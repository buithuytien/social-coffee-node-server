import commentsModel from "./comments-model.js";

export const findComments = () => commentsModel.find()
export const findCommentsByPost = (pid) => commentsModel.find({post: pid})
export const createComment = (comment) => commentsModel.create(comment)
