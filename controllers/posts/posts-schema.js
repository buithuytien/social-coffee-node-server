import mongoose from 'mongoose';
const schema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId,  ref: 'UserModel'},
    recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'RecipeModel'},
    recipe_external: String,
    postImage: String,
    photos: [String], // remove ?
    title: String,
    content: String,
    likes: Number
}, {collection: 'posts'});
export default schema;