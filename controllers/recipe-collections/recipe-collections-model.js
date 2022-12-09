import mongoose from 'mongoose';
import recipeCollectionsSchema from "./recipe-collections-schema";
const recipeCollectionsModel = mongoose.model('RecipeCollectionModel', recipeCollectionsSchema);
export default recipeCollectionsModel;