import "./App.css";
import React from "react";
import Home from './pages/Home';
import Poster from './pages/Poster'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch> 
      <Route exact path='/' component={Home}></Route>
      <Route path='/Poster/:movieID' component={Poster}></Route>
    </Switch>
  );
}

export default App;

