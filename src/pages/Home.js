import logo from '../logo.svg';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>

            <Link to="/Poster">
                <button variant="outlined">
                    Marc's work
                </button>
            </Link>
        </header>
    )
}

export default Home

