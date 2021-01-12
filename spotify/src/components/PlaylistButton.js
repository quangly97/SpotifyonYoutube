import React, { Component } from "react";
import {Link} from "react-router-dom"
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
        this.state = {
            tracks: [],
            numOfTracks: 0,
        }
        this.handleClick.bind(this);
    }
    handleClick(playlistID) {
        this.tracklist = [];
        this.tracks = [];
        this.tracklists = [];
        this.numOfTracks = 0
        spotifyWebApi.getPlaylistTracks(playlistID).then((response) => {
            this.numOfTracks = response.total
            this.loop(this.numOfTracks, playlistID)

            // this.tracks.forEach((number) => {
            //     this.tracks[number] = spotifyWebApi.getPlaylistTracks(playlistID, {offset: number*100})
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
        console.log(this.tracks)
    }
    
    // Promise.all(this.tracks).then((response) => {
    //     console.log(response)
    //     this.tracklist.push(...response.map(hundred_tracks => {
    //         return hundred_tracks.items 
    //     })) 
    //     this.tracklist = this.tracklist.flat()
    // })

    // console.log( this.tracklist.map(item => {
    //     return  {
    //         album_name: item.track.album.name,
    //         album_images: item.track.album.images,
    //         artists: item.track.artists.map((artist) => {return artist.name}),
    //         duration: item.track.duration_ms,
    //         track_name: item.track.name,
    //         date: item.added_at,
    //     }
    // })

    render () {
        return(
            <div className="playlist-button-and-image-container">
            <Button className="playlist-button" onClick={() => {this.handleClick(this.props.id)}}>{this.props.name}</Button>
            <img className="playlist-image" src={this.props.image} alt={this.props.name}/>
            <Link to= {{
                pathname: "/youtube",
                playlist: "x",
                tracks: this.state.tracks,
            }}>
            </Link>
        </div>
        )
    }
}

// <Button className="playlist-number">{this.props.index} </Button>
export default PlaylistButton