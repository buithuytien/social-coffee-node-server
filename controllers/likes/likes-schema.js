import mongoose from "mongoose";

const likesSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'PostModel'},
}, {collection: 'likes'})
export default likesSchema