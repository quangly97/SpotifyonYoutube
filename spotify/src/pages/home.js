import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button, Card} from "react-bootstrap";
import "../css/home.css"



class Home extends Component {
    render() {
        return(
            <div className="home-page">
                <Card className="spotify-youtube-card">
                    <Card.Img className="spotify-youtube-card-img"
                        src={require("../images/spotify-youtube.jpg")}
                        alt="Spotify-Youtube"
                    />
                    <a href="https://peaceful-caverns-22670.herokuapp.com/login">
                        <Button className="spotify-youtube-card-button" onClick={() => {this.handleClick()}}> Login With Spotify </Button>
                    </a>
                </Card>
          </div>
        )
    }
}

export default Home;


// 