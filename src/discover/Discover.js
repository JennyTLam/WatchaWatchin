import React, { useEffect, useState } from "react";

import data from "./data.json";
const axios = require("axios");

const Discover = () => {
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
    <div>
      {movies.map((movie) => (
        <MoviePoster key={movie.imdbID} data={movie} />
      ))}
    </div>
  );
};

const MoviePoster = ({ data }) => {
  return (
    <div className="movie-card">
      <img height={400} src={data["Poster"]} alt={data["Title"] + "poster"} />
      <h2>{data["Title"]}</h2>
    </div>
  );
};

export default Discover;
