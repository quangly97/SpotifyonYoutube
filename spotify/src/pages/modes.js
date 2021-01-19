import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Button,
  } from "react-bootstrap";
import {Link} from 'react-router-dom';
import "../css/modes.css"



class Modes extends Component {
    render() {
        return(
            <div className="modes-page">
                <div className="modes-container">
                    <div className="dynamic-button-and-image-container">
                        <Button className="dynamic-button"> Dynamic </Button>
                        <img className="dynamic-image" src={require("../images/dynamic.jpg")} alt=""/>
                    </div>
                    <div className="playlist-button-and-image-container">
                        <Link to="/pickPlaylist">
                            <Button className="playlist-button"> Playlist </Button>
                            <img className="playlist-image" src={require("../images/monkey-with-headphones.jpg")} alt=""/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modes
