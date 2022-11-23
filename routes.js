import express from 'express';
import { getMovies, addMovie, searchMovie, removeMovie } from './controllers.js';

const app = express()

//parse JSON using express
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//get the movie list in the form of JSON
app.get("/movie", getMovies)

//add movie to the list
app.post("/movie", addMovie)

//search for a movie in the list
app.get("/movie/:id", searchMovie);

//remove movie from the list
app.delete("/movie/:id", removeMovie)

export default app;