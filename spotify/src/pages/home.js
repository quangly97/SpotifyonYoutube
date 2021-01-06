import React, { Component } from 'react';
import {
    Button,
    Card
  } from "react-bootstrap";

  class Home extends Component {
    render() {
        return(
            <div className="background">
                <Card id="App-card">
                    <Card.Img
                        src={require("../images/spotify-youtube.jpg")}
                        alt="Spotify-Youtube"
                    />
                    <a href="http://localhost:8888/login">
                        <Button id="primary-button" className="primary-button">
                        Login With Spotify
                        </Button>
                    </a>
                </Card>
          </div>
        )

    }
}

export default Home