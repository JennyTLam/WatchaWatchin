import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import data from "./data.json";
const axios = require("axios");

const Discover = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    data["best-pictures"].forEach((id) => {
      axios
        .get(`https://omdbapi.com/?i=${id}&apikey=44910e56`)
        .then((result) => {
          setMovies((movies) => [...movies, result.data]);
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

const MoviePoster = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.movieCard}>
      <img height={300} src={data["Poster"]} alt={data["Title"] + "poster"} />
      <p>{data["Title"]}</p>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  movieCard: {
    border: "1px solid lightgrey",
    margin: 10,
    width: 250,
  },
  movieGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 25,
    justifyContent: "center",
  },
}));

export default Discover;
