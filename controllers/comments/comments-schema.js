import mongoose from 'mongoose';
const schema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId,  ref: 'UserModel'},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'PostModel'},
    comment: String
}, {collection: 'comments'});
export default schema;