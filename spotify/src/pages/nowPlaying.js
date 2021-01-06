import React, { Component } from 'react';
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class NowPlaying extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        this.state = {
            loggedIn: params.access_token ? true : false,
            nowPlaying: {
                name: "Not Checked",
                image: "k"
            }
        };
        this.getNowPlaying = this.getNowPlaying.bind(this);
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token);
        }
    }
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    getNowPlaying() {
        spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
            this.setState({
                nowPlaying: {
                    name: response.item.name,
                    image: response.item.album.images[0].url,
                }
            })
        })
    }
      
    render() {
        return (
            <div className="background">
                <div> Now Playing: {this.state.nowPlaying.name} </div>
                <div> <img alt="Image Not Found" src={this.state.nowPlaying.image} />{" "} </div>
                <button onClick={this.getNowPlaying()}>Check Now Playing </button>
            </div>
        )
    }
}

export default NowPlaying

// getNowPlaying() {
//     spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
//         this.setState({
//             nowPlaying: {
//             name: response.item.name,
//             image: response.item.album.images[0].url,
//             }
//         })
//     }
// }