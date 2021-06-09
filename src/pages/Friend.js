import { Image } from 'semantic-ui-react'
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core/";
import env from "react-dotenv";
import 'semantic-ui-css/semantic.min.css';
import { useParams } from 'react-router-dom'
import { makeStyles } from "@material-ui/core"; 
import firebase from '../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Link } from 'react-router-dom';

const Friend = (props) => { 

    let {friendID} = useParams();

    const db = firebase.database().ref(`users/${friendID}/watchList`);
    const db1 = firebase.database().ref(`users/${friendID}/favorites`);
    const db3 = firebase.database().ref('users')

    const [favorites, setFavorites] = useState([])
    const [future, setFuture] = useState([])
    const [name, setName] = useState(null); 

    useEffect(() => {
        const getName = (snapshot) => { 
            if(snapshot.val()){
                setName(snapshot.val()[friendID].name)
            }
        }
        db3.on('value', getName, error => alert(error));
        return () => { db.off('value', getName); };
    }, [])

    useEffect(() => {
        const getFuture = (snapshot) => { 
            var keys = snapshot.val() ? Object.keys(snapshot.val()) : null
            var movies = keys ? keys.map(keys => snapshot.val()[keys].id) : []
            if (movies.length > 0 || movies.length > future.length) {
                var promises = movies.map(movieID => fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=c77aad00`, 
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
        const getFavorites = (snapshot) => { 
            var keys = snapshot.val() ? Object.keys(snapshot.val()) : null
            var movies = keys ? keys.map(keys => snapshot.val()[keys].id) : []
            if (movies.length > 0 || movies.length > future.length) {
                var promises = movies.map(movieID => fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=c77aad00`, 
                                                            {method: 'GET', mode: 'cors'})
                                                        .then(result => result.json()))
                Promise.all(promises)                                    
                    .then((values) => setFavorites(values))
            }
        }
        db1.on('value', getFavorites, error => alert(error));
        return () => { db1.off('value', getFavorites); };
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
    
    const makeDisplay = (contents, listType) => {
        if (contents.length == 0) { 
            if(listType === 'watchList'){
                return <p style={{marginTop: '20px'}}>Add items to Watchlist to see them here.</p>
            }
            else{
                return <p style={{marginTop: '20px'}}>Add items to Favorites to see them here.</p>
            }
        } 
        return(
            contents.map(content => { 
                const title = <b>{content["Title"]}</b>
                const plot = <p>{content["Plot"]}</p>
                return (<Link to={`/Poster/${content["imdbID"]}`}>
                        <div key={content["imdbID"]} className={classes.strip}>
                            <div style={{float: 'left', width: '90%', display: 'flex', flexDirection: 'row'}}>
                                <img className={classes.stripImage} src={`${content["Poster"]}`} alt="Movie poster"></img>
                                <div className={classes.info}>
                                    <div className={classes.introBar}>
                                        <p>{title}</p>                              
                                    </div>
                                    {plot}
                                </div>
                            </div>
                            <div style={{float: 'right', width: '10%'}}>
                            </div>
                        </div>
                        </Link>)
            })
        )
    } 

    const [display, setDisplay] = useState(makeDisplay(favorites, 'favorites'))

    const setDisplayFavorites = () => setDisplay(makeDisplay(favorites, 'favorites'));
    const setDisplayFuture = () => setDisplay(makeDisplay(future, 'watchList'));

    // Get profile pic image.
    return (
        <header className="App-header" style={{justifyContent: "flex-start"}}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className={classes.midAlign}>
                <img className={classes.profilePicture} src="https://picsum.photos/460/360?num=1" alt="Profile Picture"></img>
                <h1>{name}</h1>
                <div> 
                    <button className={classes.slightSpread} onClick={setDisplayFavorites}>Favorites</button>
                    <button className={classes.slightSpread} onClick={setDisplayFuture}>Watchlist</button>
                </div>
                <div> 
                    {display}
                </div>
            </div> 
        </header>
    );

}

export default Friend;

