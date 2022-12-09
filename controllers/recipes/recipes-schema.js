import mongoose from 'mongoose';
const schema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    recipeName: String,
    recipeDescription: String,
    recipeNote: String,
    ingredients: [String],
    steps: [String]
}, {collection: 'recipes'});
export default schema;
