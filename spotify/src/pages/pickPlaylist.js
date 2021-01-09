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
            <div className="playlist-page">
                <div className="pick-a-playlist-text">
                    Pick a playlist
                </div>
                <div className="playlist-buttons-container">
                    {this.state.playlists.map((playlist, index) => (
                        <PlaylistButton key={playlist.name} id={playlist.id} index={index} name={playlist.name} image={playlist.images[0].url}></PlaylistButton>
                        ))}
                </div>
            </div>
        )
    }
}

export default PickPlaylist;