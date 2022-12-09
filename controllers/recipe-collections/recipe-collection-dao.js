import recipeCollectionsModel from "./recipe-collections-model.js";

export const findRecipeCollections = () => recipeCollectionsModel.find();
export const findRecipeCollectionsByAuthor = (uid) => recipeCollectionsModel.find({author: uid});
export const createRecipeCollection = (recipeCollection) => recipeCollectionsModel.create(recipeCollection);