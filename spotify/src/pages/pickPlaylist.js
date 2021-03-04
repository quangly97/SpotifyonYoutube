import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import PlaylistButton from "../components/PlaylistButton"
import "../css/pickPlaylist.css"
import NavigationBar from "../components/Navigation"
import ls from 'local-storage'

const spotifyWebApi = new Spotify();

class PickPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
        }
        this.getPlaylists = this.getPlaylists.bind(this);
        spotifyWebApi.setAccessToken(ls.get("access_token"))
        
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
        return(
            <div>
                <NavigationBar back="modes"> </NavigationBar>
                <div className="playlist-page">
                    
                    {/* <div className="pick-a-playlist-text">
                        Pick a playlist
                    </div> */}
                    <div className="playlists-container">
                        {this.state.playlists.map((playlist, index) => (
                            <PlaylistButton key={playlist.name} id={playlist.id} index={index} name={playlist.name} image={playlist.images[0].url}></PlaylistButton>
                            ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default PickPlaylist;