import mongoose from 'mongoose';
const schema = mongoose.Schema({
    author: mongoose.Schema.Types.ObjectId,
    recipe: mongoose.Schema.Types.ObjectId,
    postImage: String,
    photos: [String], // remove ?
    title: String,
    content: [String],
    likes: Number
}, {collection: 'posts'});
export default schema;