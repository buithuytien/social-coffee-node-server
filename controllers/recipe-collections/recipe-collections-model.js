import mongoose from 'mongoose';
import recipeCollectionsSchema from "./recipe-collections-schema.js";
const recipeCollectionsModel = mongoose.model('RecipeCollectionModel', recipeCollectionsSchema);
export default recipeCollectionsModel;