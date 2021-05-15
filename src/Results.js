import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import {Container, TextField, Select, FormControl, InputLabel, MenuItem} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    card: {
      border: '1px solid lightgrey'
    }
  }));

const Results = ({results, query}) => {
    const classes = useStyles();
    return (
        <Container>
            <p>{results.length === 0 && query !== ''? "No results, please modify search." : null }</p>
            {results.map(r => <div key={r["imdbID"]} className={classes.card}><p>{r["Title"]}({r["Year"]})</p><p>{r["Genre"]}</p><p>{r["Type"]}</p></div>)}
        </Container>
    )
}

export default Results; 