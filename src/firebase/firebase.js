import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB1vNCRnB3Ym-WBocKheZkzDRWfEaxkbls",
  authDomain: "find-watchawatchin.firebaseapp.com",
  databaseURL: "https://find-watchawatchin-default-rtdb.firebaseio.com",
  projectId: "find-watchawatchin",
  storageBucket: "find-watchawatchin.appspot.com",
  messagingSenderId: "215928504171",
  appId: "1:215928504171:web:4c785ea6c623ed1970962e",
  measurementId: "G-4DENE7EFX9"
};

firebase.initializeApp(firebaseConfig);

export default firebase; 