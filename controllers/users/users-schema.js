import mongoose from "mongoose";

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    profilePicture: String,
    userName: String,
    password: String,
    role: {type: String, enum: ['BASIC', 'PREMIUM', 'ADMIN']}
}, {collection: 'users'})

export default schema