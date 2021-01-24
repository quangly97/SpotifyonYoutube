import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import "../css/modes.css"
import NavigationBar from "../components/Navigation"



class Modes extends Component {
    render() {
        return(
            <div>
                <NavigationBar back=""></NavigationBar>
                <div className="modes-page">
                    <div className="modes-container">
                        <div className="dynamic-button-and-image-container">
                            <Link to="/dynamic">
                                <Button className="dynamic-button"> Dynamic </Button>
                                <img className="dynamic-image" src={require("../images/dynamic.jpg")} alt=""/>
                            </Link>
                        </div>
                        <div className="playlist-button-and-image-container">
                            <Link to="/pickPlaylist">
                                <Button className="playlist-button"> Playlist </Button>
                                <img className="playlist-image" src={require("../images/monkey-with-headphones.jpg")} alt=""/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modes
