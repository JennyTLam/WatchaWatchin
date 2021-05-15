import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import {Container, TextField, Select, FormControl, InputLabel, MenuItem} from '@material-ui/core/';
import SearchBar from './SearchBar'; 
import Results from './Results'; 

const baseURL = 'http://www.omdbapi.com/?apikey=29d3c0e8'; 

function App() {

  const [query, setQuery] = useState(''); 
  const [year, setYear] = useState(''); 
  const [type, setType] = useState(''); 
  const [genre, setGenre] = useState('ALL'); 
  const [displayed, setDisplayed] = useState([]); 


  useEffect(() => {
    let url = baseURL; 
    if (query !== ''){
      url += `&s=${query}`;
    }

    if (year !== 'ALL'){
      url += `&y=${year}`;
    }

    if (type !== 'ALL'){
      url += `&type=${type}`; 
    }

    if(query !== ''){
      let titles = []
      console.log(url)
      fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        let getTitlesById = []; 
        if(data && data["Search"]){
          getTitlesById = data["Search"].map(r => r.imdbID)
        }

        getTitlesById.forEach((id, idx) => {
          fetch(baseURL + `&i=${id}`)
            .then(response => response.json())
            .then(result => {
              if(genre === 'ALL'){
                titles.push(result);
              }
              else{
                let genres = result["Genre"].split(",").map(g => g.trim());
                if (genres.includes(genre)){
                  titles.push(result);
                }
              }

              if (idx === getTitlesById.length-1){
                setDisplayed(titles);
              }
            })
        })
      })
    }
    else{
      setDisplayed([]);
    }
 
  }, [query, year, type, genre]);

  return (
    <Container>
      <SearchBar query={query} setQuery={setQuery} year={year} setYear={setYear} type={type} setType={setType} genre={genre} setGenre={setGenre}/>
      <Results results={displayed} query={query} />
    </Container>
  );
}

export default App;
