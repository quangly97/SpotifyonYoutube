import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Playlists.css";
import Spotify from "spotify-web-api-js";
import {
    Button
  } from "react-bootstrap";

const spotifyWebApi = new Spotify();

class PlaylistButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick.bind(this);
    }
    handleClick(playlistID) {
        var tracks = [];
        var numOfTracks = 0;
        spotifyWebApi.getPlaylistTracks(playlistID).then((response) => {
            numOfTracks = response.total

            var i;
            console.log(Math.ceil(numOfTracks / 100))
            for (i=0; i < Math.ceil(numOfTracks / 100); i++) {
                spotifyWebApi.getPlaylistTracks(playlistID, {offset: i*100}).then((response) => {
                    tracks = tracks.concat(response.items.map((song) => {
                        return [song.track.name, song.track.artists[0].name]
                    }))
                    console.log(tracks)
                });
            }
        });


        
    
        const options = {
            offset: 100,
        }
        // spotifyWebApi.getPlaylistTracks(playlistID, options).then((response) => {
        //     console.log(response)
        //     console.log(response.items[0].track.artists[0].name) // artist name
        //     console.log(response.items[0].track.name) // song title
        //     console.log(response.items[0].track.album.images[0].url) 

        //     console.log(response.items[0].images[0].url) // playlist images in a url
        // });
    }
    render () {
        return(
        <div>
            <Button onClick={() => {this.handleClick(this.props.id)}} className="playlist_button" size="lg">{this.props.name}</Button>
        </div>
        )
    }
}

export default PlaylistButton