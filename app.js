import express from 'express';
import cors from 'cors'

import RecipesController from "./controllers/recipes/recipes-controller.js";

// db
import mongoose from "mongoose";
import UsersController from "./controllers/users/users-controller.js";
mongoose.connect("mongodb://localhost:27017/social-coffee");
// console.log("env variable:")
// console.log(process.env.DB_CONNECTION_STRING)
// console.log("mongodb+srv://buithuytien1313:25011993@cluster0.xybi1r2.mongodb.net/?retryWrites=true&w=majority")
// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
//     || 'mongodb://localhost:27017/tuiter'
// mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors());
app.use(express.json());


RecipesController(app);
UsersController(app);

app.listen( 4000); // process.env.PORT ||