import React, { Component } from 'react';
import {Button, Card} from "react-bootstrap";
import spotifyLogoPicture from "../images/spotify-youtube.jpg"
import "bootstrap/dist/css/bootstrap.min.css";

class LoginCard extends Component {
    render () {
        return(
            <Card className="spotify-youtube-card">
            <Card.Img className="spotify-youtube-card-img"
                src={spotifyLogoPicture}
                alt="Spotify-Youtube"
            />
            <a href={`${process.env.REACT_APP_BACK_END_URL}/login`}>
                <Button className="spotify-youtube-card-button" > Login With Spotify </Button>
            </a>
        </Card>
        )
    }
}


export default LoginCard;

       