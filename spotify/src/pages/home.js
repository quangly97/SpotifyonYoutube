import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import { Button, Card} from "react-bootstrap";
import "../css/home.css"



class Home extends Component {
    constructor () {
        super();
        this.handleClick = this.handeClick.bind(this)
    }

    async handleClick () {
        const response = await fetch('/login', { 
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
    }

    render() {
        return(
            <div className="home-page">
                <Card className="spotify-youtube-card">
                    <Card.Img className="spotify-youtube-card-img"
                        src={require("../images/spotify-youtube.jpg")}
                        alt="Spotify-Youtube"
                    />
                    <Button className="spotify-youtube-card-button" onClick={() => {this.handleClick()}}> Login With Spotify </Button>
        
                </Card>
          </div>
        )
    }
}

export default Home;


/* <a href="https://peaceful-caverns-22670.herokuapp.com/login"> 