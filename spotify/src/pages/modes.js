
import React, { Component } from 'react';
import ModeCard from '../components/ModeCard';
import dynamicImg from "../images/dynamic.jpg";
import playlistImg from "../images/monkey-with-headphones.jpg";
import NavigationBar from "../components/Navigation.jsx";
import Spotify from 'spotify-web-api-js';

import "../css/modes.css"
import "bootstrap/dist/css/bootstrap.min.css";

const spotifyWebApi = new Spotify();


class Modes extends Component {
    constructor () {
        super();
        this.access_token = this.getHashParams();
    }
    getHashParams = () => {
        if (window.location.href.split("/")[4]) {
            let queryParams = window.location.href.split("/")[4]
            let tokenList = [queryParams.split("&")[0], queryParams.split("&")[1]]
            tokenList = tokenList.map((token) => {
                return token.split("=")[1]
            })
            spotifyWebApi.setAccessToken(tokenList[0])
            localStorage.setItem("access_token", tokenList[0])
            localStorage.setItem("refresh_token", tokenList[1])
            return tokenList[0]
        }
    }

    render() {
        return(
            <div className="modes-page">
                <NavigationBar back=""></NavigationBar>
                <div className="modes-container">
                    <ModeCard id="dynamic" img={dynamicImg}/>
                    <ModeCard id="playlist" img={playlistImg}/>
                </div>
            </div>
        )
    }
}

export default Modes