import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/social-coffee');


import * as dao from './recipe-collection-dao.js'

const RecipeCollectionsController = (app) => {
    app.get('/api/recipeCollections', findRecipeCollections)
    app.get('/api/recipeCollections/author/uid', findRecipeCollectionsByAuthor)
    app.post('/api/recipeCollections', createRecipeCollection)
}

const findRecipeCollections = async (req, res) => {
    const recipeCollections = await dao.findRecipeCollections()
    res.json(recipeCollections)
}

const findRecipeCollectionsByAuthor = async (req, res) => {
    const recipeCollections = await dao.findRecipeCollections()
    res.json(recipeCollections)
}

const createRecipeCollection = async (req, res) => {
    const newRecipeCollection = req.body;
    const currentUser = req.session['currentUser']
    newRecipeCollection.author = currentUser._id
    const insertedRecipeCollection = await dao.createRecipeCollection(newRecipeCollection);
    res.json(insertedRecipeCollection);
}

export default RecipeCollectionsController