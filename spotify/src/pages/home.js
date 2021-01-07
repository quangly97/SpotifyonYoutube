import React, { Component } from 'react';
import Spotify from "spotify-web-api-js";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Button,
    Card
  } from "react-bootstrap";
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
                    <a href="http://localhost:8888/login">
                        <Button className="spotify-youtube-card-button">
                            Login With Spotify
                        </Button>
                    </a>
                </Card>
          </div>
        )
    }
}

export default Home;