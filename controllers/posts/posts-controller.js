import mongoose from "mongoose";

import * as postsDao from './posts-dao.js'
import * as recipesDao from "../recipes/recipes-dao.js";
import * as publicDao from '../public/public-dao.js';
import * as userDao from '../users/users-dao.js';

const defaultRecipe = {
    "name": "default",
    "author": "639634380b3ccf1f61dfa683",
    "recipeDescription": "Cafe Au Lait",
    "recipeName": "Cafe Au Lait with 2% Milk",
    "recipeNote": "Substitute 2% plant-based milk for whole milk if desired.",
    "image": "https://www.coffeeforless.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/0/1000x1000_1.jpg",
    "ingredients": "Espresso, Milk, Sugar",
    "steps": "Brew espresso, Pour milk, Add sugar",
}

const PostsController = (app) => {
    app.post('/api/posts', createPost);
    app.get('/api/posts', findPosts);
    app.get('/api/posts/pid', findPostById);
    app.get('/api/posts/author/:uid', findPostsByAuthor);
    app.get('/api/posts/recipe/:rid', findPostsByRecipe);
    app.put('/api/posts/:pid', updatePost);
    app.delete('/api/posts/:pid', deletePost);
}



const postWithEmbedRecipe = async (post) => {
    // replace recipe_id with recipe object
    if (post.recipe !== null) {
        const recipe = await recipesDao.findRecipeById(post.recipe);
        post.recipe = recipe;
    } else{
        post.recipe = defaultRecipe;
    }

    // replace author with author object
    if (post.author !== null) {
        const author = await userDao.findUserById(post.author);
        post.author = author;
    }
    // replace recipe_external_id with recipe_external object

    //check if post has recipe_external field
    console.log(post.recipe_external)
    // check if recipe_external field of post exists
    // if (post.recipe_external !== undefined) {
    //     if (post.recipe_external !== null) {
    //         console.log(post.recipe_external)
    //         const req = {'params': {'rid': post.recipe_external}}
    //         const recipe_external = await publicDao.findPublicCoffeeRecipeById(req);
    //         // post.recipe_external = recipe_external;
    //     }
    // }

    return post;
}

// find post by id
const findPostById = async (req, res) => {
    const postId = req.query.pid;
    const post = await postsDao.findPostById(postId);
    const postWithEmbedRecipe = await postWithEmbedRecipe(post);
    res.json(postWithEmbedRecipe);
}

const findPosts = async (req, res) => {
    const posts = await postsDao.findPost();

    // for each post, replace recipe_id with recipe object
    const postsWithEmbedRecipe = await Promise.all(posts.map(postWithEmbedRecipe));
    res.json(postsWithEmbedRecipe);
}


    // for (let i = 0; i<posts.length; i++) {
    //     posts[i] = postWithEmbedRecipe(posts[i]);
    // }


const findPostsByAuthor = async (req, res) => {
    const uid = req.params.uid;
    const posts = await postsDao.findPostByAuthor(uid);
    const postsWithEmbedRecipe = await Promise.all(posts.map(postWithEmbedRecipe));
    res.json(postsWithEmbedRecipe);
}

const findPostsByRecipe = async (req, res) => {
    const rid = req.params.rid;
    // try to find post by recipe id, if error, try to find post by recipe_external id, if error, return empty array
    try {
        const posts = await postsDao.findPostByRecipe(rid);

        const postsWithEmbedRecipe = await Promise.all(posts.map(postWithEmbedRecipe));
        res.json(postsWithEmbedRecipe);
    } catch (e) {
        try {
            const posts = await postsDao.findPostByRecipeExternal(rid);
            const postsWithEmbedRecipe = await Promise.all(posts.map(postWithEmbedRecipe));
            res.json(postsWithEmbedRecipe);
        } catch (e) {
            res.json([]);
        }
    }



}

const createPost = async (req, res) => {
    const newPost = req.body;
    // get login user from session, add to post
    const currentUser = req.session['currentUser']
    if (currentUser){
        newPost.author = currentUser._id
    }

    // check if recipe id is a field in req body
    // let recipe_id = newPost.recipe
    // let recipe_external_id = newPost.recipe_external
    //
    // if (recipe_id === undefined) {
    //     newPost.recipe = null
    // }

    // if (recipe_external_id === undefined) {
    //     newPost.external_recipe = null
    // }

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
    const updates = req.body
    const status = await postsDao.updatePost(postIdToUpdate, updates);
    res.json(status);
}

export default PostsController

