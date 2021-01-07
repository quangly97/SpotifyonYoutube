import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import PlaylistButton from "../components/PlaylistButton"
import "../css/pickPlaylist.css"

const spotifyWebApi = new Spotify();

class PickPlaylist extends Component {
    constructor() {
        super();
        this.state = {
            playlists: [],
        }
        this.getPlaylists = this.getPlaylists.bind(this)
        
    }
    componentDidMount() {
        this.getPlaylists()
    }
    getPlaylists () {
        spotifyWebApi.getUserPlaylists()
        .then((response) => {
            this.setState({playlists: response.items})})
        .catch((error) => {
            console.log(error)
        });
    }
    render() {
        console.log(this.state.playlists)
        return(
            <div>
                <div className="pick-playlist-text">
                    Pick a playlist
                </div>
                <div className="playlist-button-container">
                    {this.state.playlists.map(playlist => (
                        <PlaylistButton key={playlist.name} id={playlist.id} name={playlist.name}></PlaylistButton>
                        ))}
                </div>
            </div>
        )
    }
}

export default PickPlaylist;