import {getPosts} from "../posts/posts-controller.js";
import users from "../users/users.js";
import * as likesDao from "./likes-dao.js";

let likes = [
    {_id: '123', user: '111', post: '123'},
    {_id: '234', user: '111', post: '234'},
    {_id: '345', user: '222', post: '345'},
    {_id: '456', user: '333', post: '345'},
]

const LikesController = (app) => {
    const populate = (
        {
            rawResults, fieldToPopulate,
            sourceData, sourceField
        }) => {
        const populatedResults = rawResults.map((raw) => {
            const source = sourceData.find(source => source[sourceField] === raw[fieldToPopulate])
            return ({
                ...raw,
                [fieldToPopulate]: source
            })
        })
        return populatedResults
    }
    const userLikesPost = async (req, res) => {
        const uid = req.params.uid
        const pid = req.params.pid

        const newLike = await likesDao.userLikesPost(uid, pid)
        // likes.push(newLike)
        res.json(newLike)
    }
    const userUnlikesPost = async (req, res) => {
        const uid = req.params.uid
        const pid = req.params.pid
        const status = await likesDao.userUnlikesPost(uid, pid)

        // likes = likes.filter((l) => l.user !== uid && l.post !== pid)
        res.send(status)
    }
    const findAllLikes = async (req, res) => {
        const likes = await likesDao.findAllLikes()
        res.json(likes)
    }
    const findPostsLikedByUser = async (req, res) => {
        const uid = req.params.uid
        const posts = await likesDao.findPostsLikedByUser(uid)
        res.json(posts)
        // const posts = likes.filter((like) => like.user === uid)
        // const populatedPosts = populate({
        //     rawResults: posts,
        //     fieldToPopulate: 'post',
        //     sourceData: getPosts(),
        //     sourceField: '_id'
        // })
        // res.json(populatedPosts)
    }
    const findUsersWhoLikedPost = async (req, res) => {
        const pid = req.params.pid
        const users = await likesDao.findUsersThatLikePost(pid)
        res.json(users)

        // const usersWhoLikePost = likes.filter((like) => like.post === pid)
        // const populateUsers = populate({
        //     rawResults: usersWhoLikePost,
        //     fieldToPopulate: 'user',
        //     sourceData: users,
        //     sourceField: '_id'
        // })
        // res.json(populateUsers)
    }

    app.post('/users/:uid/likes/:pid', userLikesPost)
    app.delete('/users/:uid/unlikes/:pid', userUnlikesPost)
    app.get('/likes', findAllLikes)
    app.get('/users/:uid/likes', findPostsLikedByUser)
    app.get('/posts/:pid/likes', findUsersWhoLikedPost)
    // app.put(updateLike)
}

export default LikesController;