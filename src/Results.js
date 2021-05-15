import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MoviePoster from "../src/discover/MoviePoster";
import {
  Container,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core/";

import Discover from "./discover/Discover";

const useStyles = makeStyles((theme) => ({
  movieGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  card: {
    border: "1px solid lightgrey",
  },
}));

const Results = ({ results, query }) => {
  const classes = useStyles();
  return (
    <Container className={classes.movieGrid}>
      <p>
        {results.length === 0 && query !== ""
          ? "No results, please modify search."
          : null}
      </p>
      {results.map((r) => (
        <MoviePoster key={r.imdbID} data={r} />
      ))}
    </Container>
  );
};

export default Results;
