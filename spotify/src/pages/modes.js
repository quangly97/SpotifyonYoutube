import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import Spotify from 'spotify-web-api-js';
import {Link} from 'react-router-dom';
import "../css/modes.css"
import NavigationBar from "../components/Navigation"
import ls from 'local-storage'

const spotifyWebApi = new Spotify();

class Modes extends Component {
    constructor () {
        super();
        this.getHashParams = this.getHashParams.bind(this)
        this.getHashParams2 = this.getHashParams2.bind(this)
        this.params = this.getHashParams();
        console.log(this.params)
    }
    getHashParams() {
        if (window.location.href.split("/")[4]) {
            console.log(window.location.href)
            var x = window.location.href.split("/")[4]
            console.log(x)
            x = [x.split("&")[0], x.split("&")[1]]
            console.log(x)
            x = x.map((token) => {
                return token.split("=")[1]
            })
            console.log(x)
            spotifyWebApi.setAccessToken(x[0])
            localStorage.setItem("access_token", x[0])
            localStorage.setItem("refresh_token", x[1])
            console.log(localStorage.getItem("access_token"))
            console.log(localStorage.getItem("refresh_token"))
            return x[0]
        }
    }
        
    getHashParams2() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

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
