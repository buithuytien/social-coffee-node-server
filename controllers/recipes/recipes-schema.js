import mongoose from 'mongoose';
const schema = mongoose.Schema({
    author: mongoose.Schema.Types.ObjectId,
    recipeName: String,
    recipeDescription: String,
    recipeNote: String,
    ingredients: [String],
    steps: [String]
}, {collection: 'recipes'});
export default schema;
