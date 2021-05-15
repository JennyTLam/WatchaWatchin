// TODO: Change these
import Home from './Home';
import Poster from './Poster'
import { Switch, Route } from 'react-router-dom';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/Poster' component={Poster}></Route>
    </Switch>
  );
}

export default Main; 

