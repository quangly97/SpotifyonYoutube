import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spotify from "spotify-web-api-js";
import {
    Button
  } from "react-bootstrap";
  import "../css/pickPlaylist.css"

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
            for (i=0; i < Math.ceil(numOfTracks / 100); i++) {
                spotifyWebApi.getPlaylistTracks(playlistID, {offset: i*100}).then((response) => {
                    tracks.push(...response.items.map((item) => {
                        return  {
                            album_name: item.track.album.name,
                            album_images: item.track.album.images,
                            artists: item.track.artists.map((artist) => {return artist.name}),
                            duration: item.track.duration_ms,
                            track_name: item.track.name,
                            date: item.added_at
                        }
                    }));
                });
            }
        console.log(tracks)
        });
    }
    render () {
        return(
        <div className="playlist-button-and-image-container">
            <Button className="playlist-button" onClick={() => {this.handleClick(this.props.id)}}>{this.props.name}</Button>
            <a href="http://localhost:3000/youtube">
                <img className="playlist-image" src={this.props.image} alt={this.props.name}/>
            </a>
        </div>
        )
    }
}

// <Button className="playlist-number">{this.props.index} </Button>
export default PlaylistButton