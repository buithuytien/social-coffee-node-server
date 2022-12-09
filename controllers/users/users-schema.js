import mongoose from "mongoose";

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    profilePicture: String,
    userName: String,
    password: String
}, {collection: 'users'})

export default schema