import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import env from "react-dotenv";
import data from "./data.json";
import MoviePoster from "./MoviePoster";

const Discover = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    data["best-pictures"].forEach((id) => {
      fetch(`https://omdbapi.com/?i=${id}&apikey=44910e56`)
        .then(response => response.json())
        .then(result => {
          setMovies((movies) => [...movies, result]);
        });
    });
  }, []);
  return (
    <div className={classes.movieGrid}>
      {movies.map((movie) => (
        <MoviePoster key={movie.imdbID} data={movie} />
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  movieGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
}));

export default Discover;
