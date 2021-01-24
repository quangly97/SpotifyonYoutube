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
        this.playlistID = this.props.id;
        this.playlistName = this.props.name;
        this.numOfTracks = 0;
        this.state  = {
            tracks: []
        }
        this._isMounted = false
        
        
        this.loop.bind(this);
    }

    async componentWillMount ()  {
  
        this.tracks = [];

        // Store length of tracks, then start loop of getting all the tracks
        await spotifyWebApi.getPlaylistTracks(this.playlistID).then((response) => {
            this.numOfTracks = response.total
        })
        this.loop(this.numOfTracks, this.playlistID)

    }

    // Get all tracks for each playlist by looping through each 100 tracks given
    async loop(number, ID) {

        this._isMounted = true

        for (let i=0; i < Math.ceil(number / 100); i++) {
            var r = await spotifyWebApi.getPlaylistTracks(ID, {offset: i*100}).then(response => {return response})
            this.tracks.push(r)
        }
        

        this.tracks = this.tracks.map(hundred_tracks => {
            return hundred_tracks.items
        })
        this.tracks = [].concat.apply([], this.tracks);

        if (this._isMounted) {
            
            this.setState({
                tracks: this.tracks.map(item => {
                    return  {
                        album_name: item.track.album.name,
                        album_images: item.track.album.images,
                        artists: item.track.artists.map((artist) => {return artist.name}),
                        duration: item.track.duration_ms,
                        track_name: item.track.name,
                        date: item.added_at,
                        id: item.track.id,
                    }
                })
            })
            this._isMounted = false
        }
    }

    componentWillUnmount () {
        this._isMounted = false
    }

    render () {
        if (this.state.tracks === []) return null;
        return (
            <div className="playlist-button-and-image-container">
                <Link to= {{
                    pathname: "/youtube",
                    playlistID: this.playlistID,
                    playlistName: this.playlistName,
                    tracks: this.state.tracks
                    }}>
                    <Button className="playlist-button">{this.playlistName}</Button>
                    <img className="playlist-image" src={this.props.image} alt={this.playlistName}/>
                </Link>
            </div>
        )
    }
}
export default PlaylistButton