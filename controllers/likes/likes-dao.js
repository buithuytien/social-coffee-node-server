import likesModel from "./likes-model.js";

export const userLikesPost = async (uid, pid) => {
    return await likesModel.create({user: uid, post: pid})
}
export const userUnlikesPost = async(uid, pid) => {
    return await likesModel.deleteOne({user: uid, post: pid})
}
export const findPostsLikedByUser = async(uid) => {
    return await likesModel
        .find({user: uid}, {user: false})
        .populate('Post', 'title')
        .exec()
}
export const findUsersThatLikePost = async(pid) => {
    return await likesModel.find({post: pid}, {post: false})
        .populate('user', 'username')
        .exec()
}
export const findAllLikes = async () =>
    await likesModel.find()
