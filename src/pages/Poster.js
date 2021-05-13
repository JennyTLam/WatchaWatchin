import { Grid, Image } from 'semantic-ui-react'
import React from "react";
import env from "react-dotenv";
import 'semantic-ui-css/semantic.min.css';

class Poster extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {cont: null};
    }

    componentDidMount() {
        this.renderPoster();
    }

    renderPoster = async () => { 
        try {
            var res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${env.API_KEY}`, 
                                    {method: 'GET', 
                                     mode: 'cors'})
                                .then(result => result.json());
            
            this.setState({
                cont: res
            });
            console.log(res)
            console.log(this.state)
        } catch (err) {
          console.log(err);
        }
    }
    
    render = () => {
        const sizes = [4, 8, 4]
        const call = [this.makeImage, this.makeInformation, this.makeInteraction]
        var count = -1
        
        return (
            <header className="App-header">
                <Grid>
                    {sizes.map((s, i) => {
                        count++; 
                        return <Grid.Column width={s} key={count}> 
                            {call[i]()}
                        </Grid.Column>
                    })}
                </Grid>
            </header>
        );
    }

    makeImage = () => {
        var path = ""
        if (this.state.cont != null) {
            path = `${this.state.cont["Poster"]}`
        }
        return ( 
            <Image src={path} alt="Movie poster"></Image>
        );
    } 

    makeInformation = () => {
        var content = this.state.cont
        if (content == null) { 
            return
        }
        const title = <b>{content["Title"]}</b>
        const year = <i>({content["Year"]})</i>
        const runtime = content["Runtime"]
        const languages = content["Language"]
        const plot = <p>{content["Plot"]}</p>
        const awards = <p>{content["Awards"]}</p>
        const ratings = <ul> 
                            {this.state.cont["Ratings"].map(o => <li>{o.Source}: {o.Value}</li>)}
                        </ul>
        return (
            <div>
                <p>{title} {year}</p>
                <p>{runtime} | {languages}</p>
                {plot}
                <p>Ratings</p>
                {ratings}
                {awards}
            </div>
            
        )
    } 

    makeInteraction = () => {
        return ( 
            <div>
                <p><button>Watch on Disney+</button></p>
                <p><button>Add to Watchlist</button></p>
            </div>
        )
    }

}

  



export default Poster

