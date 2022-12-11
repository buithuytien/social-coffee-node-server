import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'
import mongoose from "mongoose";
import session from 'express-session'

import RecipesController from "./controllers/recipes/recipes-controller.js";

// db

import UsersController from "./controllers/users/users-controller.js";
import PostsController from "./controllers/posts/posts-controller.js";
import CommentsController from "./controllers/comments/comments-controller.js";
import RecipeCollectionsController from "./controllers/recipe-collections/recipe-collection-controller.js";
import PublicController from "./controllers/public/public-controller.js";

dotenv.config()

const CONNECTION_STRING = process.env.DB_CONNECT_STRING
    || 'mongodb://localhost:27017/social-coffee'
console.log(CONNECTION_STRING)
mongoose.connect(CONNECTION_STRING);

const app = express();
// app.use(cors());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(session({
    secret: 'should be an environment variable',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(express.json());


RecipesController(app);
UsersController(app);
PostsController(app);
CommentsController(app);
RecipeCollectionsController(app);
PublicController(app);



app.listen( 4000); // process.env.PORT ||
console.log("app running at port: ")