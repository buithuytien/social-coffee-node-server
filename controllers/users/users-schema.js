import mongoose from "mongoose";

const schema = mongoose.Schema({
    userName: String,
    password: String
}, {collection: 'users'})

export default schema