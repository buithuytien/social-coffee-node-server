import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/social-coffee');

import * as recipeDao from './recipes-dao.js'

const RecipesController = (app) => {
    app.post('/api/recipes', createRecipe);
    app.get('/api/recipes', findRecipes);
    app.get('/api/recipes/author/:uid', findRecipesByAuthor);
    app.put('/api/recipes/:rid', updateRecipe);
    app.delete('/api/recipes/:rid', deleteRecipe);
}

const findRecipes = async (req, res) => {
    const recipes = await recipeDao.findRecipe()
    console.log(recipes)
    res.json(recipes);
}

const findRecipesByAuthor = async (req, res) => {
    const uid = req.params.uid;
    const recipes = await recipeDao.findRecipeByAuthor(uid);
    console.log(recipes);
    res.json(recipes)
}


const createRecipe = async (req, res) => {
    const newRecipe = req.body;
    const currentUser = req.session['currentUser']
    newRecipe.author = currentUser._id
    console.log("from node server, create recipe recipe-controller, print new recipe");
    console.log(newRecipe);
    const insertedRecipe = await recipeDao.createRecipe(newRecipe);
    res.json(insertedRecipe);
}

const deleteRecipe = async (req, res) => {
    const recipeIdToDelete = req.params.rid;
    const status = await recipeDao.deleteRecipe(recipeIdToDelete);
    // tuits = tuits.filter(t =>
    //     t._id !== tuitdIdToDelete);
    res.json(status);
}

const updateRecipe = async (req, res) => {
    const recipeIdToUpdate = req.params.rid;
    const updates = req.body;
    // const tuitIndex = tuits.findIndex((t) => t._id === tuitdIdToUpdate)
    // tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};
    const status = await recipeDao.updateRecipe(recipeIdToUpdate, updates);
    res.json(status);
}

export default RecipesController

