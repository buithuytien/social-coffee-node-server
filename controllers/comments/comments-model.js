import mongoose from "mongoose";
import commentsSchema from "./comments-schema.js";
const commentsModel = mongoose.model('CommentModel', commentsSchema)
export default commentsModel;