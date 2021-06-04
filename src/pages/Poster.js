import { Grid, Image } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { useParams } from "react-router-dom";
import firebase from "../firebase/firebase";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating from "@material-ui/lab/Rating";

const Poster = (props) => {
  const sizes = [4, 8, 4];
  var count = -1;
  let { movieID } = useParams();
  const [content, setContent] = useState({});

  const db = firebase.database().ref(`users/${props.uid}/watchList`);
  const db1 = firebase.database().ref(`users/${props.uid}/watchHistory`);
  const db2 = firebase.database().ref(`users/${props.uid}/favorites`);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=44910e56`, {
      method: "GET",
      mode: "cors",
    })
      .then((result) => result.json())
      .then((result) => setContent(result));
  }, [content]);

  const makeImage = () => {
    var path = "";
    if (content != null) {
      path = `${content["Poster"]}`;
    }
    return <Image src={path} alt="Movie poster"></Image>;
  };

  const makeInformation = () => {
    if (content == null) {
      return;
    }
    const title = (
      <b style={{ fontSize: 50, marginRight: "5px" }}>{content["Title"]}</b>
    );
    const year = <i>({content["Year"]})</i>;
    const runtime = content["Runtime"];
    const languages = content["Language"];
    const plot = <p>{content["Plot"]}</p>;
    const awards = <p>{content["Awards"]}</p>;
    const ratings = (
      <ul>
        {content["Ratings"]
          ? content["Ratings"].map((o) => (
              <li key={o.Source} style={{ margin: "10px" }}>
                {o.Source}: {o.Value}
              </li>
            ))
          : null}
      </ul>
    );
    return (
      <div>
        <p>
          {title} {year}
        </p>
        <p>
          {runtime} | {languages}
        </p>
        {plot}
        <p>Ratings</p>
        {ratings}
        {awards}
      </div>
    );
  };

  // Create a new post reference with an auto-generated id

  const [futureMovies, setFutureMovies] = useState({});
  const [futureKeys, setFutureKeys] = useState([]);
  const [futureMovieIDs, setFutureMovieIDs] = useState([]);

  useEffect(() => {
    const getFuture = (snapshot) => {
      var snapVal = snapshot.val();
      var futureKeys = snapVal ? Object.keys(snapshot.val()) : [];
      var futureMovieIDs = futureKeys
        ? futureKeys.map((futureKeys) => snapshot.val()[futureKeys].id)
        : [];
      setFutureMovies(snapVal);
      setFutureKeys(futureKeys);
      setFutureMovieIDs(futureMovieIDs);
    };
    db.on("value", getFuture, (error) => alert(error));
    return () => {
      db.off("value", getFuture);
    };
  }, []);

  const [watchedMovies, setWatchedMovies] = useState({});
  const [watchedKeys, setWatchedKeys] = useState([]);
  const [watchedMovieIDs, setWatchedMovieIDs] = useState([]);

  useEffect(() => {
    const getWatched = (snapshot) => {
      var snapVal = snapshot.val();
      var watchedKeys = snapVal ? Object.keys(snapshot.val()) : [];
      var watchedMovieIDs = watchedKeys
        ? watchedKeys.map((watchedKey) => snapshot.val()[watchedKey].id)
        : [];
      setWatchedMovies(snapVal);
      setWatchedKeys(watchedKeys);
      setWatchedMovieIDs(watchedMovieIDs);
    };
    db1.on("value", getWatched, (error) => alert(error));
    return () => {
      db.off("value", getWatched);
    };
  }, []);

  const [toggleFutureName, setToggleFutureName] = useState(
    futureMovieIDs.includes(movieID)
      ? "Remove from Watchlist"
      : "Add to Watchlist"
  );

  useEffect(() =>
    futureMovieIDs.includes(movieID)
      ? setToggleFutureName("Remove from Watchlist")
      : setToggleFutureName("Add to Watchlist")
  );

  // Link this up to DB
  const toggleWatchList = () => {
    var idToKey = {};
    futureMovieIDs.map((val, i) => (idToKey[val] = futureKeys[i]));
    if (futureMovieIDs.includes(movieID)) {
      delete futureMovies[idToKey[movieID]];
      var updates = { [`users/${props.uid}/watchList`]: futureMovies };
      firebase.database().ref().update(updates);
      setFutureMovies(futureMovies);
      const index = futureMovieIDs.indexOf(movieID);
      if (index > -1) {
        futureMovieIDs.splice(index, 1);
      }
      setFutureMovieIDs(futureMovieIDs);
      setToggleFutureName("Add to Watchlist");
    } else {
      var newPostRef = db.push();
      newPostRef.set({
        id: movieID,
      });
      setToggleFutureName("Remove from Watchlist");
    }
  };

  const toggleWatchHistory = () => {
    // Link this up to DB
    var idToKey = {};
    watchedMovieIDs.map((val, i) => (idToKey[val] = watchedKeys[i]));
    if (!watchedMovieIDs.includes(movieID)) {
      var newPostRef = db1.push();
      newPostRef.set({
        id: movieID,
      });
    }
  };

  const [favoriteMovies, setFavoriteMovies] = useState({});
  const [favoriteKeys, setFavoriteKeys] = useState([]);
  const [favoriteMovieIDs, setFavoriteMovieIDs] = useState([]);

  useEffect(() => {
    const getFavorite = (snapshot) => {
      var snapVal = snapshot.val();
      var favoriteKeys = snapVal ? Object.keys(snapshot.val()) : [];
      var favoriteMovieIDs = favoriteKeys
        ? favoriteKeys.map((favoriteKey) => snapshot.val()[favoriteKey].id)
        : [];
      setFavoriteMovies(snapVal);
      setFavoriteKeys(favoriteKeys);
      setFavoriteMovieIDs(favoriteMovieIDs);
    };
    db2.on("value", getFavorite, (error) => alert(error));
    return () => {
      db2.off("value", getFavorite);
    };
  }, []);

  const [toggleFavoritesName, setToggleFavoritesName] = useState(
    favoriteMovieIDs.includes(movieID)
      ? "Remove from Favorites"
      : "Add to Favorites"
  );

  useEffect(() =>
    favoriteMovieIDs.includes(movieID)
      ? setToggleFavoritesName("Remove from Favorites")
      : setToggleFavoritesName("Add to Favorites")
  );

  // Link this up to DB
  const toggleFavoriteList = () => {
    var idToKey = {};
    favoriteMovieIDs.map((val, i) => (idToKey[val] = favoriteKeys[i]));
    if (favoriteMovieIDs.includes(movieID)) {
      delete favoriteMovies[idToKey[movieID]];
      var updates = { [`users/${props.uid}/favorites`]: favoriteMovies };
      firebase.database().ref().update(updates);
      setFavoriteMovies(favoriteMovies);
      const index = favoriteMovieIDs.indexOf(movieID);
      if (index > -1) {
        favoriteMovieIDs.splice(index, 1);
      }
      setFavoriteMovieIDs(favoriteMovieIDs);
      setToggleFavoritesName("Add to Favorites");
    } else {
      var newPostRef = db2.push();
      newPostRef.set({
        id: movieID,
      });
      setToggleFavoritesName("Remove from Favorites");
    }
  };

  const [openForm, setOpenForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const toggleReviewForm = () => {
    setOpenForm(!openForm);
  };

  const saveReview = () => {
    const dateTime = new Date().toLocaleString();
    const ratingObj = {
      Title: content["Title"],
      Poster: content["Poster"],
      Rating: rating,
      Comment: comments,
      Date: dateTime,
    };
    firebase.database().ref(`users/${props.uid}/reviews`).push(ratingObj);
    setOpenForm(false);
    setRating(0);
    setComments("");
  };

  const cancelReview = () => {
    setOpenForm(false);
    setRating(0);
    setComments("");
  };

  const makeInteraction = () => {
    return (
      <div>
        {props.uid ? (
          <p>
            <button onClick={toggleWatchList}>{toggleFutureName}</button>
          </p>
        ) : null}
        {props.uid ? (
          <p>
            <button onClick={toggleFavoriteList}>{toggleFavoritesName}</button>
          </p>
        ) : null}
        <button onClick={toggleReviewForm}>Add Review</button>
      </div>
    );
  };

  const call = [makeImage, makeInformation, makeInteraction];

  return (
    <header className="App-header">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <Grid>
        {sizes.map((s, i) => {
          count++;
          return (
            <Grid.Column width={s} key={count}>
              {call[i]()}
            </Grid.Column>
          );
        })}
      </Grid>
      <Dialog open={openForm} onClose={toggleReviewForm} fullWidth={"md"}>
        <DialogTitle id="review-form">Movie Review</DialogTitle>
        <DialogContent>
          <DialogContentText>Leave a review for this movie</DialogContentText>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Comments"
            fullWidth
            onChange={(e) => {
              setComments(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <button onClick={cancelReview}>Cancel</button>
          <button onClick={saveReview}>Save</button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Poster;
