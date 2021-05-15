import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import {Container, TextField, Select, FormControl, InputLabel, MenuItem} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    card: {
      border: '1px solid lightgrey'
    }
  }));

const Results = ({results}) => {
    const classes = useStyles();
    console.log("hall")
    console.log(results)

    return (
        <Container>
            <p>{results.length === 0 ? "No results, please modify search." : null }</p>
            {results.map(r => <div key={r["imdbID"]} className={classes.card}><p>{r["Title"]}</p><p>{r["Genre"]}</p></div>)}
        </Container>
    )
}

export default Results; 