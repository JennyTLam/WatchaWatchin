import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Container, TextField, Select, FormControl, InputLabel, MenuItem} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  bar: {
    border: '1px solid lightgrey', 
    display: 'flex', 
    flexDirection: 'row'
  }
}));


const SearchBar = ({query, setQuery, year, setYear, type, setType, genre, setGenre}) => {
  const classes = useStyles();


  console.log("query:", query); 
  console.log('year:', year);
  console.log('type:', type); 
  console.log('genre:', genre)

  const thisYear = (new Date()).getFullYear();
  const years = Array.from(new Array(200),( val, index) => thisYear - index);

  return(
    <Container className={classes.bar}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField label="Title" variant="outlined" value={query} onChange={(e) => {setQuery(e.target.value)}}/>
        <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Year of Release</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                value={year}
                onChange={(e) => {setYear(e.target.value)}}
                label="Year"
              >
                <MenuItem value={'ALL'}>All</MenuItem>
                {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}

              </Select>
        </FormControl>        
        <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                value={type}
                onChange={(e) => {setType(e.target.value)}}
                label="Type"
              >
                <MenuItem value={'ALL'}>All</MenuItem>
                <MenuItem value={'movie'}>Movie</MenuItem>
                <MenuItem value={'series'}>Series</MenuItem>
                <MenuItem value={'episode'}>Episode</MenuItem>
              </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Genre</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                value={genre}
                onChange={(e) => {setGenre(e.target.value)}}
                label="Genre"
              >
                <MenuItem value={'ALL'}>All</MenuItem>
                <MenuItem value={'Action'}>Action</MenuItem>
                <MenuItem value={'Adult'}>Adult</MenuItem>
                <MenuItem value={'Adventure'}>Adventure</MenuItem>
                <MenuItem value={'Animation'}>Animation</MenuItem>
                <MenuItem value={'Biography'}>Biography</MenuItem>
                <MenuItem value={'Comedy'}>Comedy</MenuItem>
                <MenuItem value={'Crime'}>Crime</MenuItem>
                <MenuItem value={'Documentary'}>Documentary</MenuItem>
                <MenuItem value={'Drama'}>Drama</MenuItem>
                <MenuItem value={'Family'}>Family</MenuItem>
                <MenuItem value={'Fantasy'}>Fantasy</MenuItem>
                <MenuItem value={'Film Noir'}>Film Noir</MenuItem>
                <MenuItem value={'Game Show'}>Game Show</MenuItem>
                <MenuItem value={'History'}>History</MenuItem>
                <MenuItem value={'Musical'}>Musical</MenuItem>
                <MenuItem value={'Mystery'}>Mystery</MenuItem>
                <MenuItem value={'News'}>News</MenuItem>
                <MenuItem value={'Reality-TV'}>Reality-TV</MenuItem>
                <MenuItem value={'Romance'}>Romance</MenuItem>
                <MenuItem value={'Sci-Fi'}>Sci-Fi</MenuItem>
                <MenuItem value={'Short'}>Short</MenuItem>
                <MenuItem value={'Sport'}>Sport</MenuItem>
                <MenuItem value={'Talk-Show'}>Talk</MenuItem>
                <MenuItem value={'Thriller'}>Thriller</MenuItem>
                <MenuItem value={'War'}>War</MenuItem>
                <MenuItem value={'Western'}>Western</MenuItem>
              </Select>
        </FormControl>
      </form>
    </Container>
  );
};

export default SearchBar;