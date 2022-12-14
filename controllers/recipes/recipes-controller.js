import mongoose from "mongoose";

import * as recipeDao from './recipes-dao.js'
import * as recipesDao from "./recipes-dao.js";
import * as userDao from "../users/users-dao.js";

const RecipesController = (app) => {
    app.post('/api/recipes', createRecipe);
    app.get('/api/recipes', findRecipes);
    app.get('/api/recipes/:rid', findRecipesById)
    // when hook to react, retrieve author id, then pass to find recipe
    app.get('/api/recipes/author/:uid', findRecipesByAuthor);
    app.put('/api/recipes/:rid', updateRecipe);
    app.delete('/api/recipes/:rid', deleteRecipe);
    app.get('/api/recipes/search/:term', searchRecipe);
}

// function to return a*3
const recipeWithEmbedObject = async (recipe) => {
    // replace author with author object
    if (recipe.author !== null) {
        const author = await userDao.findUserById(recipe.author);
        recipe.author = author;
    }
    return recipe;
}


// find recipe by recipe id
const findRecipesById = async (req, res) => {
    const rid = req.params.rid;
    const recipe = await recipeDao.findRecipeById(rid);
    if (recipe.author !== null) {
        const author = await userDao.findUserById(recipe.author);
        recipe.author = author;
    }
    res.json(recipe);
}

const findRecipes = async (req, res) => {
    const recipes = await recipeDao.findRecipe()
    const recipeWithEmbedObject = await Promise.all(recipes.map(recipeWithEmbedObject));
    res.json(recipeWithEmbedObject);

}

const findRecipesByAuthor = async (req, res) => {
    const uid = req.params.uid;
    const recipes = await recipeDao.findRecipeByAuthor(uid);
    console.log(recipes);
    res.json(recipes)
}


const createRecipe = async (req, res) => {
    console.log('create recipe controller, req.session:', req.session);

    const newRecipe = req.body;
    const currentUser = req.session['currentUser']

    if (currentUser){
        newRecipe.author = currentUser._id
    }
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

const searchRecipe = async (req, res) => {
    const term = req.params.term;
    const recipes = await recipeDao.searchRecipe(term);
    res.json(recipes);
}

export default RecipesController

