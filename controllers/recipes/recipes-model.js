import mongoose from 'mongoose';
import recipeSchema from './recipes-schema.js'
const recipesModel = mongoose.model('RecipeModel', recipeSchema);
export default recipesModel;