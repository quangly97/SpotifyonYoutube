import axios from 'axios';
import React, { Component } from 'react';
import Spotify from "spotify-web-api-js";
import PlaylistButton from "../components/PlaylistButton"
import "../css/Playlists.css";
const spotifyWebApi = new Spotify();

class Youtube extends Component {
    constructor() {
        super();
        this.state = {
            apiKey: "AIzaSyAUlBPBvCwXcYNNahVcmWPKphhIs4YjaWQ",
            searchTerm: "",
            songName: "",
            playlists: [],
        }
        this.search = this.search.bind(this)
        
    }
    componentDidMount() {
        this.search("chicken")
        this.getPlaylists()
        
    }
    createPlaylistButtons() {
        this.setState.playlists.map(playlist => {return playlist.name});
    }
    getPlaylists () {
        spotifyWebApi.getUserPlaylists()
        .then((response) => {
            this.setState({playlists: response.items})})
        .catch((error) => {
            console.log(error)
        });
    }

    async search(query) {
        axios
        .get("https://www.googleapis.com/youtube/v3/search?key=" + this.state.apiKey + "&q=" + query + "&part=snippet&maxResults=5&type=video")
        .then((response) => {
        })
        .catch((error) => {
            console.log(error)
        });
    }


    render() {

        console.log(this.state.playlists)
        return(
            <div className="body">
                <div className="container">
                    <iframe id="player"
                            title ="player"
                            width="640" height="360"
                            src="https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1">
                    </iframe>    
                </div>
                <div className="pick_playlist_text">
                    Pick a playlist
                </div>
                <div className="playlist_containeer">
                    {this.state.playlists.map(playlist => (
                        <PlaylistButton key={playlist.name} id={playlist.id} name={playlist.name}></PlaylistButton>
                        ))}
                </div>
            </div>
        )
    }
}

export default Youtube