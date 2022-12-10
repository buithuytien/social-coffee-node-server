import recipeCollectionsModel from "./recipe-collections-model.js";

export const findRecipeCollections = () => recipeCollectionsModel.find();
export const findRecipeCollectionById = (cid) => recipeCollectionsModel.findById(cid);
export const findRecipeCollectionsByAuthor = (uid) => recipeCollectionsModel.find({author: uid});
export const createRecipeCollection = (recipeCollection) => recipeCollectionsModel.create(recipeCollection);

export const updateRecipeCollection = (cid, recipeCollection) => recipeCollectionsModel.updateOne({_id: cid}, {$set: recipeCollection})