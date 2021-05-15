import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

const MoviePoster = ({ data }) => {
  const classes = useStyles();
  return (
    <Link to={`/Poster/${data.imdbID}`} className={classes.movieCard}>
        <img
          className={classes.posterImage}
          src={data["Poster"]}
          alt={data["Title"] + "poster"}
        />
        <p className={classes.title}>{data["Title"]}</p>
    </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  movieCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // border: "1px solid lightgrey",
    width: "24%",
    height: 400,
  },
  posterImage: {
    padding: 5,
    paddingBottom: 0,
    height: "80%",
    width: "80%",
  },
  title: {
    padding: 5,
    marginTop: 0,
    textAlign: "center",
    fontSize: 18,
  },
}));

export default MoviePoster;
