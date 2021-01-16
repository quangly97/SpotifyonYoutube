import React, { Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spotify from "spotify-web-api-js";
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";
import "../css/pickPlaylist.css"

const spotifyWebApi = new Spotify();

class PlaylistButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistID: this.props.id, 
            playlistName: this.props.name,
            numOfTracks: 0,
            tracks: [],
        }
        this.loop.bind(this);
    }

    componentDidMount ()  {
        this.tracks = [];
        this.numOfTracks = 0
        spotifyWebApi.getPlaylistTracks(this.state.playlistID).then((response) => {
            this.setState({
                numOfTracks: response.total
            },
            () => {this.loop(this.state.numOfTracks, this.state.playlistID)})
        })
    }

    async loop(number, ID) {
        for (let i=0; i < Math.ceil(number / 100); i++) {
            var r = await spotifyWebApi.getPlaylistTracks(ID, {offset: i*100}).then(response => {
                return response
            })
            this.tracks.push(r);
        }
        this.tracks = this.tracks.map(hundred_tracks => {
            return hundred_tracks.items
        })
        this.tracks = [].concat.apply([], this.tracks);
        this.setState({ 
            tracks: this.tracks.map(item => {
                return  {
                    album_name: item.track.album.name,
                    album_images: item.track.album.images,
                    artists: item.track.artists.map((artist) => {return artist.name}),
                    duration: item.track.duration_ms,
                    track_name: item.track.name,
                    date: item.added_at,
                }
            })
        })
    }


    render () {
        return(
            <div className="playlist-button-and-image-container">
            <Link to= {{
                pathname: "/youtube",
                playlistID: this.state.playlistID,
                playlistName: this.state.playlistName,
                tracks: this.state.tracks}}>
                <Button className="playlist-button">{this.props.name}</Button>
                <img className="playlist-image" src={this.props.image} alt={this.props.name}/>
            </Link>
        </div>
        )
    }
}

// <Button className="playlist-number">{this.props.index} </Button>
export default PlaylistButton