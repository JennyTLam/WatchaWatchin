import "./App.css";
import React, {useState, useEffect} from "react";
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core/";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ViewListIcon from '@material-ui/icons/ViewList';
import { makeStyles } from '@material-ui/core/styles';
import firebase from './firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Home from './pages/Home';
import Poster from './pages/Poster'
import User from './pages/User'

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
  icon:{
    height: 50
  }
}));


function App() {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const handleData = snap => {
      if (user) {
        if (snap.val()) {
          console.log(snap.val())
          let re = /\./gi;
          let email = user.email.replace(re, ',')
          db.child('emailTouid/' + email).set(user.uid);
          if (!snap.val().users[user.uid]) {
            db.child("users").child(user.uid).child("name").set(user.displayName);
          }
        }
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

  const Welcome = ({ user }) => {
    return(
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
              Welcome, {user.displayName} 
          </Typography>
          <span onClick={() => history.push("/")}>
            <Button style={{fontSize: 50, color: 'white'}}><HomeIcon /></Button>
          </span>
          <span onClick={() => history.push("/")}>
            <Button style={{fontSize: 50, color: 'white'}}><ViewListIcon /></Button>
          </span>
          <span onClick={() => history.push(`/Profile/${user.uid}`)}> 
            <Button style={{fontSize: 50, color: 'white'}}><PersonIcon /></Button>
          </span>
          <Button onClick={() => firebase.auth().signOut()}>
            Log out
          </Button>    
          </Toolbar>
      </AppBar>
    );
  };

  const NavBar = () => {
    return (
      <React.Fragment>
        { user ? <Welcome user={user}/> : <SignIn /> }
      </React.Fragment>
  )};

  return (
    <React.Fragment>
    <NavBar user={user} />
    <Switch> 
      <Route exact path='/' component={Home}></Route>
      <Route path='/Poster/:movieID' component={() => <Poster uid={user ? user.uid : user}></Poster>}></Route>
      <Route path='/Profile/:personID' component={() => <User></User>}></Route>
    </Switch>
    </React.Fragment>
  );
}

export default App;

