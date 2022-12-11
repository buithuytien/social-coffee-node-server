import mongoose from "mongoose";
// var mongoose = require('mongoose');


import * as dao from './recipe-collection-dao.js'
import {findRecipeCollectionById} from "./recipe-collection-dao.js";
import {findRecipeById} from "../recipes/recipes-dao.js";

const RecipeCollectionsController = (app) => {
    app.get('/api/recipeCollections', findRecipeCollections)
    app.get('/api/recipeCollections/author/:uid', findRecipeCollectionsByAuthor)
    app.post('/api/recipeCollections', createRecipeCollection)
    app.put( '/api/recipeCollections/add/:cid/:rid', addRecipeToRecipeCollection)
}

const findRecipeCollections = async (req, res) => {
    const recipeCollections = await dao.findRecipeCollections();
    let recipeCollectionWithRecipe = []
    for (let i = 0; i < recipeCollections.length; i++) {
        let recipeCollection = recipeCollections[i]
        let recipeList = recipeCollection.recipeList
        let recipeListWithRecipe = []
        for (let j = 0; j < recipeList.length; j++) {
            let recipe = await findRecipeById(recipeList[j])
            recipeListWithRecipe.push(recipe)
        }
        recipeCollection.recipeList = recipeListWithRecipe
        recipeCollectionWithRecipe.push(recipeCollection)
    }
    res.json(recipeCollectionWithRecipe);
}

const findRecipeCollectionsByAuthor = async (req, res) => {
    const uid = req.params.uid;
    const recipeCollections = await dao.findRecipeCollectionsByAuthor(uid);
    let recipeCollectionWithRecipe = []
    for (let i = 0; i < recipeCollections.length; i++) {
        let recipeCollection = recipeCollections[i]
        let recipeList = recipeCollection.recipeList
        let recipeListWithRecipe = []
        for (let j = 0; j < recipeList.length; j++) {
            let recipe = await findRecipeById(recipeList[j])
            recipeListWithRecipe.push(recipe)
        }
        recipeCollection.recipeList = recipeListWithRecipe
        recipeCollectionWithRecipe.push(recipeCollection)
    }
    res.json(recipeCollectionWithRecipe);
}

const createRecipeCollection = async (req, res) => {
    const newRecipeCollection = req.body;
    const currentUser = req.session['currentUser']
    if (currentUser) {
        newRecipeCollection.author = currentUser._id
    }

    const insertedRecipeCollection = await dao.createRecipeCollection(newRecipeCollection);
    res.json(insertedRecipeCollection);
}


const addRecipeToRecipeCollection = async(req, res) => {
    const collection_id = req.params.cid;
    const recepe_id = req.params.rid;

    let recipeCollection = await dao.findRecipeCollectionById(collection_id);
    let recipe_list = recipeCollection.recipeList;
    console.log(recipe_list)

    recipe_list.push(recepe_id)
    recipeCollection.recipeList = recipe_list;

    const status = await dao.updateRecipeCollection(collection_id, recipeCollection)
    res.json(status)

}

export default RecipeCollectionsController