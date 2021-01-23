import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Button } from "react-bootstrap";

class PlaylistNavbar extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            scrollPos: window.pageYOffset,
            show: true,
        }
    }
    render () {
        return(
         <Navbar className="playlistNavigation">
             <a href="http://localhost:8888/login">
                <img className="playlist-back-button" src={require("../images/green-left-icon-arrow-left.png")} alt="Green Left Arrow" height="30" />
             </a>
        </Navbar> 
        )
    }
}

export default PlaylistNavbar