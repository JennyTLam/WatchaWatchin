import React, { useState } from "react";
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
import { Pagination } from "@material-ui/lab";

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

const Results = ({ results, query, homePage, setHomePage, total }) => {
  const [page, setPage] = useState(homePage);
  const classes = useStyles();

  const handleChange = (event, value) => {
    setPage(value);
    setHomePage(value);
    console.log(value);
  };

  return (
    <Container>
      <Pagination
        count={Math.ceil(total / 10)}
        page={page}
        onChange={handleChange}
      />
      <div className={classes.movieGrid}>
        <p>
          {results.length === 0 && query !== ""
            ? "No results, please modify search."
            : null}
        </p>
        {results.map((r) => (
          <MoviePoster key={r.imdbID} data={r} />
        ))}
      </div>
    </Container>
  );
};

export default Results;
