import { Image } from 'semantic-ui-react'
import React, { useEffect, useState } from "react";
import env from "react-dotenv";
import 'semantic-ui-css/semantic.min.css';
import { useParams } from 'react-router-dom'
import { makeStyles } from "@material-ui/core"; 
import firebase from '../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { PinDropSharp } from '@material-ui/icons';

const User = (props) => { 

    let {personID} = useParams();

    const db = firebase.database().ref(`users/${personID}/watchList`);
    const db1 = firebase.database().ref(`users/${personID}/watchHistory`);

    const [watched, setWatched] = useState([])
    const [future, setFuture] = useState([])

    useEffect(() => {
        const getFuture = (snapshot) => { 
            var keys = snapshot.val() ? Object.keys(snapshot.val()) : null
            var movies = keys ? keys.map(keys => snapshot.val()[keys].id) : []
            if (movies.length > 0 || movies.length > future.length) {
                var promises = movies.map(movieID => fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=c77aad00`, 
                                                            {method: 'GET', mode: 'cors'})
                                                        .then(result => result.json()))
                Promise.all(promises)                                    
                    .then((values) => setFuture(values))
            }
        }
        db.on('value', getFuture, error => alert(error));
        return () => { db.off('value', getFuture); };
    }, [])

    useEffect(() => {
        const getWatched = (snapshot) => { 
            var keys = snapshot.val() ? Object.keys(snapshot.val()) : null
            var movies = keys ? keys.map(keys => snapshot.val()[keys].id) : []
            if (movies.length > 0 || movies.length > future.length) {
                var promises = movies.map(movieID => fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=c77aad00`, 
                                                            {method: 'GET', mode: 'cors'})
                                                        .then(result => result.json()))
                Promise.all(promises)                                    
                    .then((values) => setWatched(values))
            }
        }
        db1.on('value', getWatched, error => alert(error));
        return () => { db.off('value', getWatched); };
    }, [])
    

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

    const [display, setDisplay] = useState((<p><b>Select an option</b></p>))

    const setDisplayWatched = () => setDisplay(makeDisplay(watched));
    const setDisplayFuture = () => setDisplay(makeDisplay(future))

    // Get profile pic image.
    return (
        <header className="App-header" style={{justifyContent: "flex-start"}}>
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