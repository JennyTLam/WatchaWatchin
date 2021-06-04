import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import firebase from "../firebase/firebase";

const Feed = () => {
  let { personID } = useParams();

  const db = firebase.database().ref(`users`);

  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const handleData = (snapshot) => {
      let reviews = [];
      if (snapshot.val()) {
        let friends = Object.keys(snapshot.val()[personID].friends);
        Object.values(snapshot.val()[personID].reviews).forEach((review) =>
          reviews.push(review)
        );
        friends.forEach((friendUID) =>
          Object.values(snapshot.val()[friendUID].reviews).forEach((review) =>
            reviews.push(review)
          )
        );
        setFeed(reviews);
      }
    };
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
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
      //   const fullDate = content["Date"].split(" ");
      //   const date = fullDate[1] + " " + fullDate[2] + " " + fullDate[3];
      const date = content["Date"];
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
