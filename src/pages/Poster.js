import { Grid, Image } from 'semantic-ui-react'
import React, { useEffect, useState } from "react";
import env from "react-dotenv";
import 'semantic-ui-css/semantic.min.css';
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'

const Poster = () => { 
    const sizes = [4, 8, 4]
    var count = -1
    let {movieID} = useParams();
    const [content, setContent] = useState({})

    useEffect(() => { 
        fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=44910e56`, 
                                    {method: 'GET', 
                                     mode: 'cors'})
                                .then(result => result.json())
                                .then(result => setContent(result));
    }, [content])

    const makeImage = () => {
        var path = ""
        if (content != null) {
            path = `${content["Poster"]}`
        }
        return ( 
            <Image src={path} alt="Movie poster"></Image>
        );
    } 
    
    const makeInformation = () => {
        if (content == null) { 
            return
        }
        const title = <b>{content["Title"]}</b>
        const year = <i>({content["Year"]})</i>
        const runtime = content["Runtime"]
        const languages = content["Language"]
        const plot = <p>{content["Plot"]}</p>
        const awards = <p>{content["Awards"]}</p>
        const ratings = <ul> 
                            {content["Ratings"] ? content["Ratings"].map(o => <li>{o.Source}: {o.Value}</li>) : null}
                        </ul>
        return (
            <div>
                <p>{title} {year}</p>
                <p>{runtime} | {languages}</p>
                {plot}
                <p>Ratings</p>
                {ratings}
                {awards}
            </div>
            
        )
    } 

    // Link this up to DB
    const addToWatchlist = () => {}
    
    const makeInteraction = () => {
        return ( 
            <div>
                <p><button>Watch on Disney+</button></p>
                <p><button onClick={addToWatchlist}>Add to Watchlist</button></p>
                <p><button>Add to Favorites</button></p>
            </div>
        )
    }

    const call = [makeImage, makeInformation, makeInteraction]
    
    return (
        <header className="App-header">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <Navbar></Navbar>
            <Grid>
                {sizes.map((s, i) => {
                    count++; 
                    return <Grid.Column width={s} key={count}> 
                        {call[i]()}
                    </Grid.Column>
                })}
            </Grid>
        </header>
    );

}

  



export default Poster

