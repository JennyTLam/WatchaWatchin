import "./App.css";
import React, {useState, useEffect} from "react";
import Home from './pages/Home';
import Poster from './pages/Poster'
import User from './pages/User'
import { Switch, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core/";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import firebase from './firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
const db = firebase.database().ref();
const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {
  const classes = useStyles();
  const [favorites, setFavorites] = useState({});
  const [emailTouid, setEmailTouid] = useState({}); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleData = snap => {
      if (user) {
        if (snap.val()) {
          console.log(snap.val())
          let re = /\./gi;
          let email = user.email.replace(re, ',')
          db.child('emailTouid/' + email).set(user.uid);
          setEmailTouid(snap.val().emailTouid);
          if (!snap.val().users[user.uid]) {
            db.child("users").child(user.uid).child("name").set(user.displayName);
          }
          if (snap.val().users[user.uid] && snap.val().users[user.uid].favorites) {
            let favorites_arr = snap.val().users[user.uid].favorites;
            setFavorites(Object.values(favorites_arr));
          }
          else {
            setFavorites({});
          }
        }
      } else {
        setFavorites({});
        setEmailTouid({});
      }
    };
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, [user]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  const SignIn = () => {
    return(
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            WatchaWatchin
          </Typography>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          /> 
          </Toolbar>
      </AppBar>
    )
  };

  const NavBar = ({ user }) => (
      <React.Fragment>
        { user ? <Link to={`/Profile/${user.uid}`}><Welcome user={user}/></Link> : <SignIn /> }
      </React.Fragment>
  );

  const Welcome = ({ user }) => {
    return(
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Welcome, {user.displayName}
          </Typography>
          <Button onClick={() => firebase.auth().signOut()}>
            Log out
          </Button>    
          </Toolbar>
      </AppBar>
    );
  };

  return (
    <React.Fragment>
    <NavBar user={user} />
    <Switch> 
      <Route exact path='/' component={Home}></Route>
      <Route path='/Poster/:movieID' component={() => <Poster uid={user ? user.uid : user}></Poster>}></Route>
      <Route path='/Profile/:personID' component={User}></Route>
    </Switch>
    </React.Fragment>
  );
}

export default App;

