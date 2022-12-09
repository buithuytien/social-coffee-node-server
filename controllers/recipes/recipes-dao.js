import recipesModel from './recipes-model.js';
export const findRecipe = () => recipesModel.find();
export const findRecipeByAuthor = (uid) => recipesModel.find({author: uid})
export const createRecipe = (recipe) => recipesModel.create(recipe);
export const deleteRecipe = (rid) => recipesModel.deleteOne({_id: rid});
export const updateRecipe = (rid, recipe) => recipesModel.updateOne({_id: rid}, {$set: recipe})