import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Button,
    Card
  } from "react-bootstrap";
import "../css/modes.css"



class Modes extends Component {
    render() {
        return(
            <div className="modes-page">
                <div className="modes-container">
                    <div className="dynamic-button-and-image-container">
                        <Button className="dynamic-button"> Dynamic </Button>
                        <img className="dynamic-image" src={require("../images/dynamic.jpg")} alt="Playlist Picture"/>
                    </div>
                    <div className="playlist-button-and-image-container">
                        <Button className="playlist-button"> Playlist </Button>
                        <img className="playlist-image" src={require("../images/monkey-with-headphones.jpg")} alt="Playlist Picture"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modes

{/* <div className="dynamic-button-container">
<div className="dynamic-button-inner">
    <div className="dynamic-button-front">
        <Button className="dynamic-button"> Dynamic</Button>
        <img className="dynamic-image" src={require("../images/dynamic.jpg")} alt="Dynamic Picture" />
    </div>
    <div className="dynamic-button-back">
        <p> Description for dynamic</p>
    </div>
</div>
</div> */}