import { v4 as uuidv4 } from "uuid";

//data of the movies
let movies = [
  {
    id: "f222de4c-333d-43a3-a848-d31dfa7c35b3",
    title: "Inception",
    director: "Christopher Nolan",
    release_date: "2010-07-16",
  },
  {
    id: "ea1ab288-2365-4381-a9f2-729330d00df2",
    title: "The Irishman",
    director: "Martin Scorsese",
    release_date: "2019-09-27",
  },
];

//get the movie list
export const getMovies = (req, res) => {
  res.status(200).json(movies);
};

//add movie to the list
export const addMovie = (req, res) => {
  let movie = req.body;
  const movieProperties = ["title", "director", "release_date"];

  const propertiesIsOk = movieProperties.every((property) => {
    return Object.getOwnPropertyNames(movie).includes(property);
  });

  if (
    Object.getOwnPropertyNames(movie).length === 3 &&
    propertiesIsOk === true
  ) {
    const createUuid = uuidv4();
    movie = { id: createUuid, ...movie };
    movies.push(movie);

    res
      .status(200)
      .send(
        `${movie.title} movie with id (${createUuid}) has been added to the list`
      );
  } else {
    res
      .status(400)
      .send("You just need to send title, director and release date!");
  }
};

//search for a movie in the list
export const searchMovie = (req, res) => {
  const id = req.params.id;

  for (let movie of movies) {
    if (movie.id === id) {
      res.status(200).json(movie);
      return;
    }
  }

  res.status(404).send(`Movie not found with this id (${id})`);
};

//remove movie from the list
export const removeMovie = (req, res) => {
  const id = req.params.id;
  const isIdExist = movies.some((movie) => movie.id === req.params.id);

  if (isIdExist) {
    movies = movies.filter((movie) => {
      if (movie.id !== id) {
        return true;
      }
      return false;
    });

    res
      .status(200)
      .send(`The movie with id (${id}) has been deleted from the list`);
  } else {
    res.status(404).send(`Your id (${id}) was not found in the list`);
  }
};
