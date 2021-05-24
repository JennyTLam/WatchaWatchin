import React, { useState, useEffect } from "react";
import { Container} from "@material-ui/core/";
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from "../SearchBar";
import env from "react-dotenv";
import Results from "../Results";
import Discover from "../discover/Discover";

var baseURL = "" 
if (env != null) { 
  baseURL = `http://www.omdbapi.com/?apikey=${env.API_KEY}`;
}

function Home() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("ALL");
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    let url = baseURL;
    if (query !== "") {
      url += `&s=${query}`;
    }

    if (year !== "ALL") {
      url += `&y=${year}`;
    }

    if (type !== "ALL") {
      url += `&type=${type}`;
    }

    if (query !== "") {
      let titles = [];
      console.log(url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let getTitlesById = [];
          if (data && data["Search"]) {
            getTitlesById = data["Search"].map((r) => r.imdbID);
          }

          getTitlesById.forEach((id, idx) => {
            fetch(baseURL + `&i=${id}`)
              .then((response) => response.json())
              .then((result) => {
                if (genre === "ALL") {
                  titles.push(result);
                } else {
                  let genres = result["Genre"].split(",").map((g) => g.trim());
                  if (genres.includes(genre)) {
                    titles.push(result);
                  }
                }

                if (idx === getTitlesById.length - 1) {
                  setDisplayed(titles);
                }
              });
          });
        });
    } else {
      setDisplayed([]);
    }
  }, [query, year, type, genre]);

  return (
    <Container>
      <SearchBar
        query={query}
        setQuery={setQuery}
        year={year}
        setYear={setYear}
        type={type}
        setType={setType}
        genre={genre}
        setGenre={setGenre}
      />

      {query ? <Results results={displayed} query={query} /> : <Discover />}
    </Container>
  );
}

export default Home;
