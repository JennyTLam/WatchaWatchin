import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../SearchBar";
import env from "react-dotenv";
import Results from "../Results";
import Discover from "../discover/Discover";

var baseURL = "";
if (env != null) {
  baseURL = `http://www.omdbapi.com/?apikey=${env.API_KEY}`;
}

function Home() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [genre, setGenre] = useState("ALL");
  const [displayed, setDisplayed] = useState([]);
  const [homePage, setHomePage] = useState(1);
  const [total, setTotal] = useState(0);

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
      url += `&page=${homePage}`;
      let titles = [];
      console.log(url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let getTitlesById = [];
          if (data && data["Search"]) {
            getTitlesById = data["Search"].map((r) => r.imdbID);
            setTotal(data["totalResults"]);
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
  }, [query, year, type, genre, homePage]);

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

      {query ? (
        <Results
          results={displayed}
          query={query}
          homePage={homePage}
          setHomePage={setHomePage}
          total={total}
        />
      ) : (
        <Discover />
      )}
    </Container>
  );
}

export default Home;
