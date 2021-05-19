import { Image } from 'semantic-ui-react'
import React, { useEffect, useState } from "react";
import env from "react-dotenv";
import 'semantic-ui-css/semantic.min.css';
import { useParams } from 'react-router-dom'
import { makeStyles } from "@material-ui/core"; 

const User = () => { 
    const watched = [{
        "Title": "Star Wars: Episode IV - A New Hope",
        "Year": "1977",
        "Rated": "PG",
        "Released": "25 May 1977",
        "Runtime": "121 min",
        "Genre": "Action, Adventure, Fantasy, Sci-Fi",
        "Director": "George Lucas",
        "Writer": "George Lucas",
        "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
        "Plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
        "Language": "English",
        "Country": "USA, UK",
        "Awards": "Won 6 Oscars. Another 57 wins & 29 nominations.",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "8.6/10"
            },
            {
                "Source": "Rotten Tomatoes",
                "Value": "92%"
            },
            {
                "Source": "Metacritic",
                "Value": "90/100"
            }
        ],
        "Metascore": "90",
        "imdbRating": "8.6",
        "imdbVotes": "1,245,210",
        "imdbID": "tt0076759",
        "Type": "movie",
        "DVD": "10 Oct 2016",
        "BoxOffice": "$460,998,507",
        "Production": "Lucasfilm Ltd.",
        "Website": "N/A",
        "Response": "True"
    }, {
        "Title": "Star Wars: Episode V - The Empire Strikes Back",
        "Year": "1980",
        "Rated": "PG",
        "Released": "20 Jun 1980",
        "Runtime": "124 min",
        "Genre": "Action, Adventure, Fantasy, Sci-Fi",
        "Director": "Irvin Kershner",
        "Writer": "Leigh Brackett (screenplay by), Lawrence Kasdan (screenplay by), George Lucas (story by)",
        "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams",
        "Plot": "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.",
        "Language": "English",
        "Country": "USA, UK",
        "Awards": "Won 1 Oscar. Another 24 wins & 20 nominations.",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "8.7/10"
            },
            {
                "Source": "Rotten Tomatoes",
                "Value": "94%"
            },
            {
                "Source": "Metacritic",
                "Value": "82/100"
            }
        ],
        "Metascore": "82",
        "imdbRating": "8.7",
        "imdbVotes": "1,173,214",
        "imdbID": "tt0080684",
        "Type": "movie",
        "DVD": "10 Apr 2015",
        "BoxOffice": "$292,753,960",
        "Production": "Lucasfilm Ltd.",
        "Website": "N/A",
        "Response": "True"
    }, {
        "Title": "Star Wars: Episode VI - Return of the Jedi",
        "Year": "1983",
        "Rated": "PG",
        "Released": "25 May 1983",
        "Runtime": "131 min",
        "Genre": "Action, Adventure, Fantasy, Sci-Fi",
        "Director": "Richard Marquand",
        "Writer": "Lawrence Kasdan (screenplay by), George Lucas (screenplay by), George Lucas (story by)",
        "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams",
        "Plot": "After a daring mission to rescue Han Solo from Jabba the Hutt, the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, Luke struggles to help Darth Vader back from the dark side without falling into the Emperor's trap.",
        "Language": "English",
        "Country": "USA, UK",
        "Awards": "Nominated for 4 Oscars. Another 22 wins & 16 nominations.",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "8.3/10"
            },
            {
                "Source": "Rotten Tomatoes",
                "Value": "82%"
            },
            {
                "Source": "Metacritic",
                "Value": "58/100"
            }
        ],
        "Metascore": "58",
        "imdbRating": "8.3",
        "imdbVotes": "961,607",
        "imdbID": "tt0086190",
        "Type": "movie",
        "DVD": "10 Apr 2015",
        "BoxOffice": "$309,306,177",
        "Production": "Lucasfilm Ltd.",
        "Website": "N/A",
        "Response": "True"
    }] 
    const future = [{
        "Title": "Star Wars: Episode VII - The Force Awakens",
        "Year": "2015",
        "Rated": "PG-13",
        "Released": "18 Dec 2015",
        "Runtime": "138 min",
        "Genre": "Action, Adventure, Sci-Fi",
        "Director": "J.J. Abrams",
        "Writer": "Lawrence Kasdan, J.J. Abrams, Michael Arndt, George Lucas (based on characters created by)",
        "Actors": "Harrison Ford, Mark Hamill, Carrie Fisher, Adam Driver",
        "Plot": "As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, an ex-stormtrooper, must join Han Solo and Chewbacca to search for the one hope of restoring peace.",
        "Language": "English",
        "Country": "USA",
        "Awards": "Nominated for 5 Oscars. Another 62 wins & 131 nominations.",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "7.9/10"
            },
            {
                "Source": "Rotten Tomatoes",
                "Value": "93%"
            },
            {
                "Source": "Metacritic",
                "Value": "80/100"
            }
        ],
        "Metascore": "80",
        "imdbRating": "7.9",
        "imdbVotes": "868,284",
        "imdbID": "tt2488496",
        "Type": "movie",
        "DVD": "01 Apr 2016",
        "BoxOffice": "$936,662,225",
        "Production": "Lucasfilm Ltd., Bad Robot",
        "Website": "N/A",
        "Response": "True"
    }, {
        "Title": "Star Wars: Episode I - The Phantom Menace",
        "Year": "1999",
        "Rated": "PG",
        "Released": "19 May 1999",
        "Runtime": "136 min",
        "Genre": "Action, Adventure, Fantasy, Sci-Fi",
        "Director": "George Lucas",
        "Writer": "George Lucas",
        "Actors": "Liam Neeson, Ewan McGregor, Natalie Portman, Jake Lloyd",
        "Plot": "Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.",
        "Language": "English, Sanskrit",
        "Country": "USA",
        "Awards": "Nominated for 3 Oscars. Another 26 wins & 66 nominations.",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "6.5/10"
            },
            {
                "Source": "Rotten Tomatoes",
                "Value": "52%"
            },
            {
                "Source": "Metacritic",
                "Value": "51/100"
            }
        ],
        "Metascore": "51",
        "imdbRating": "6.5",
        "imdbVotes": "739,673",
        "imdbID": "tt0120915",
        "Type": "movie",
        "DVD": "10 Apr 2015",
        "BoxOffice": "$474,544,677",
        "Production": "Lucasfilm Ltd.",
        "Website": "N/A",
        "Response": "True"
    }, {
        "Title": "Star Wars: Episode III - Revenge of the Sith",
        "Year": "2005",
        "Rated": "PG-13",
        "Released": "19 May 2005",
        "Runtime": "140 min",
        "Genre": "Action, Adventure, Fantasy, Sci-Fi",
        "Director": "George Lucas",
        "Writer": "George Lucas",
        "Actors": "Ewan McGregor, Natalie Portman, Hayden Christensen, Ian McDiarmid",
        "Plot": "Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.",
        "Language": "English",
        "Country": "USA",
        "Awards": "Nominated for 1 Oscar. Another 26 wins & 62 nominations.",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "7.5/10"
            },
            {
                "Source": "Rotten Tomatoes",
                "Value": "80%"
            },
            {
                "Source": "Metacritic",
                "Value": "68/100"
            }
        ],
        "Metascore": "68",
        "imdbRating": "7.5",
        "imdbVotes": "720,863",
        "imdbID": "tt0121766",
        "Type": "movie",
        "DVD": "10 Apr 2015",
        "BoxOffice": "$380,270,577",
        "Production": "Lucasfilm Ltd.",
        "Website": "N/A",
        "Response": "True"
    }]

    let {personID} = useParams();

    // const [watched, setWatched] = useState([])
    // const [future, setFuture] = useState([])


    // useEffect(() => { 
    //     Promise.resolve()
    //         // Replace with Heroku db grab
    //         .then(() => "Hello World")
    //         .then(movies => Promise.all(movies.map(movieID =>
    //                                                     fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=${env.API_KEY}`, 
    //                                                           {method: 'GET', mode: 'cors'})
    //                                                      .then(result => result.json())))
    //                                     .then(values => setWatched(values)));
    // }, [watched])

    // useEffect(() => { 
    //     Promise.resolve()
    //         // Replace with Heroku db grab
    //         .then(() => "Hello World")
    //         .then(movies => Promise.all(movies.map(movieID =>
    //                                                     fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=${env.API_KEY}`, 
    //                                                           {method: 'GET', mode: 'cors'})
    //                                                      .then(result => result.json())))
    //                                     .then(values => setFuture(values)));
    // }, [future])

    const useStyles = makeStyles({
        introBar: {
            display: "flex",
            justifyContent: "space-between",
        },
        strip: { 
            padding: "10px",
            display: "flex",
            borderColor: "gray",
            borderStyle: "solid",
            marginTop: "10px",
            marginLeft: "5px", 
            marginRight: "5px",
        }, 
        info: { 
            padding: "20px",
        },
        stripImage: { 
            width: "150px", 
            height: "auto",
        }, 
        midAlign: { 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center",
        }, 
        profilePicture: { 
            width: "250px", 
            height: "auto",
            margin: "30px 0px 20px 0px"
        }, 
        slightSpread: { 
            margin: "0px 10px 0px 10px"
        }
    }, {name: "MuiButton"});

    const [classes, setClasses] = useState(useStyles())
    
    const makeDisplay = (contents) => {
        if (contents == null) { 
            return
        }
        return ( 
            contents.map(content => { 
                const title = <b>{content["Title"]}</b>
                const plot = <p>{content["Plot"]}</p>
                return (<div class={classes.strip}>
                            <div class={classes.info}>
                                <div class={classes.introBar}>
                                    <p>{title}</p>                              
                                    <i class="fa fa-trash-o"></i>
                                </div>
                                {plot}
                            </div>
                            <img class={classes.stripImage} src={`${content["Poster"]}`} alt="Movie poster"></img>
                        </div>)
            })
        )
    } 

    const [display, setDisplay] = useState(makeDisplay(watched))

    const setDisplayWatched = () => setDisplay(makeDisplay(watched))
    const setDisplayFuture = () => setDisplay(makeDisplay(future))
    
    // Get profile pic image.
    return (
        <header className="App-header">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div class={classes.midAlign}>
                <img class={classes.profilePicture} src="https://picsum.photos/460/360?num=1" alt="Profile Picture"></img>
                <div> 
                    <button class={classes.slightSpread} onClick={setDisplayWatched}>Watch History</button>
                    <button class={classes.slightSpread} onClick={setDisplayFuture}>Watchlist</button>
                </div>
                <div> 
                    {display}
                </div>
            </div> 
        </header>
    );

}

export default User

// style="font-size:24px"