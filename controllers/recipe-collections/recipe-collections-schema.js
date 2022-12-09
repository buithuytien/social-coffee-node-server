import mongoose from 'mongoose';
const schema = mongoose.Schema({
    title: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    recipeList: [{type: mongoose.Schema.Types.ObjectId, ref: 'RecipeModel'}]
}, {collection: 'recipe-collections'});
export default schema;