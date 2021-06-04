import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import firebase from "../firebase/firebase";

const Feed = () => {
  let { personID } = useParams();

  const db1 = firebase.database().ref(`users/${personID}/feed`);
  const db2 = firebase.database().ref(`users/${personID}/friends`);
  const dbReviews = firebase.database().ref(`users/${personID}/reviews`);

  const [myFeed, setMyFeed] = useState([]);
  const [feed, setFeed] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getMyFeed = (snapshot) => {
      if (snapshot.val()) {
        var keys = Object.keys(snapshot.val());
        setMyFeed(keys.map((keys) => snapshot.val()[keys]));
      }
    };
    db1.on("value", getMyFeed, (error) => alert(error));
    return () => {
      db1.off("value", getMyFeed);
    };
  }, []);

  useEffect(() => {
    const getFriends = (snapshot) => {
      if (snapshot.val()) {
        var keys = Object.keys(snapshot.val());
        var friends = keys.map((keys) => snapshot.val()[keys]);
        setFriends(friends);
      }
    };
    db2.on("value", getFriends, (error) => alert(error));
    return () => {
      db2.off("value", getFriends);
    };
  }, []);

  useEffect(() => {
    var tempFeed = [];
    const getFriendFeed = (snapshot) => {
      if (snapshot.val()) {
        var keys = Object.keys(snapshot.val());
        tempFeed.concat(keys.map((keys) => snapshot.val()[keys]));
      }
    };
    var friendDB = [];
    friends.forEach((friend) => {
      const tempDB = firebase.database().ref(`users/${friend}/feed`);
      friendDB.push(tempDB);
      tempDB.on("value", getFriendFeed, (error) => alert(error));
    });
    myFeed.concat(tempFeed);
    myFeed.sort((a, b) => b["Date"].date - a["Date"].date);
    // setFeed(myFeed)

    // There's a Date.parse() functions

    // Comment out during production
    setFeed([
      {
        Name: "Marc",
        Title: "Star Wars: Episode IV - A New Hope",
        Rating: "4",
        Comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        Date: Date(1995, 11, 17),
        Poster:
          "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      },
      {
        Name: "Jenny",
        Title: "Star Wars: Episode V - The Empire Strikes Back",
        Rating: "5",
        Comment:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        Date: Date(2001, 6, 1),
        Poster:
          "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      },
    ]);
    return () => {
      friendDB.forEach((db) => db.off("value", getFriendFeed));
    };
  }, []);

  const useStyles = makeStyles(
    {
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
        margin: "30px 0px 20px 0px",
      },
      slightSpread: {
        margin: "0px 10px 0px 10px",
      },
    },
    { name: "MuiButton" }
  );

  const [classes, setClasses] = useState(useStyles());

  const makeContent = () => {
    return feed.map((content) => {
      const name = <p>{content["Name"]}</p>;
      const title = <b>{content["Title"]}</b>;
      const rating = content["Rating"];
      const comment = <p>{content["Comment"]}</p>;
      const fullDate = content["Date"].split(" ");
      const date = fullDate[1] + " " + fullDate[2] + " " + fullDate[3];
      return (
        <div className={classes.strip}>
          <div
            style={{
              float: "left",
              width: "90%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <img
              className={classes.stripImage}
              src={`${content["Poster"]}`}
              alt="Movie poster"
            ></img>
            <div className={classes.info}>
              <p>{name}</p>
              <div className={classes.introBar}>
                <p>{title}</p>
              </div>
              <div className={classes.introBar}>
                <p>{date}</p>
              </div>
              <div className={classes.introBar}>
                <p>Rating: {rating}</p>
              </div>
              <br></br>
              {comment}
            </div>
          </div>
          <div style={{ float: "right", width: "10%" }}></div>
        </div>
      );
    });
  };

  return (
    <header className="App-header" style={{ justifyContent: "flex-start" }}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className={classes.midAlign}>
        <br></br>
        <h1>Feed</h1>
        <div>{makeContent()}</div>
      </div>
    </header>
  );
};

export default Feed;
