import axios from 'axios';
import React, { Component } from 'react';
import {Link} from "react-router-dom"
import { Button } from "react-bootstrap";
import "../css/youtube.css"
import Spotify from 'spotify-web-api-js'

const spotifyWebApi =  new Spotify();
class Youtube extends Component {
    constructor(props) {
        super(props);
        // Get access token to make calls
        spotifyWebApi.setAccessToken(localStorage.getItem("access_token"));

        // Start off by saving details of this playlist to localstorage if it is available
        if  (this.props.location.tracks) {
            localStorage.setItem("tracks",  JSON.stringify(this.shuffleArray(this.props.location.tracks)))
            localStorage.setItem("playlist", JSON.stringify(this.props.location.playlistName))
            localStorage.setItem("length", JSON.stringify(this.props.location.tracks.length))
        }
        // Search Terms syntax is - ["title", "spotify-id", index in the search-terms array]
        this.state = {
            apiKey: "AIzaSyAUlBPBvCwXcYNNahVcmWPKphhIs4YjaWQ",
            search_terms: localStorage.getItem("tracks") ? 
            JSON.parse(localStorage.getItem("tracks")).map((track, index) => {
                return [track.artists[0] + " - " + track.track_name, track.id, index];
            }) : "",
            current_index: 0,
            length: JSON.parse(localStorage.getItem("length")),
            query_IDs: new Array(JSON.parse(localStorage.getItem("length")))
        }

        this.search = this.search.bind(this)
        this.loadVideo = this.loadVideo.bind(this)
    }
    componentDidMount() {
        // Create this.state.query_IDs by running Youtube API search
        for (let i=0; i<5; i++) {
            if (i < this.state.length) {
                this.search(this.state.search_terms[i])
            }
        }

        spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
            if (response === "") {
                console.log("nothing has been playing for the past 15 minutes")
            }
            else if ((response !== "") & (response.is_playing===false)) {
                console.log("nothing is currently playing right now")
                // spotifyWebApi.play((response) => {
                //     console.log("play");
                // })
            }
            else {
                console.log(response.is_playing)
                console.log(response.item.name)
                console.log(response.item.artists[0].name)
                console.log(response.item.id)
                // spotifyWebApi.pause((response) => {
                //     console.log(response, "stop");
                // })
            }
        })
        .catch((error) => {
            console.log(error)
        })

        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api'
            window.onYouTubeIframeAPIReady = this.loadVideo;
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        else {
            this.loadVideo();
        }

    }

    loadVideo = (id) => {
        this.player = new window.YT.Player('player', {
            host: "https://www.youtube.com",
            height: '640',
            width: '1320',
            videoId: 'oYKwotHRdHo',
            playerVars: {
                controls: 1,
                autoplay: 0,
                disablekb: 1,
                enablejsapi: 1,
                origin: "https://localhost:3000"
            },
            events: {
                'onReady': this.onPlayerReady,
                'onStateChange': this.onPlayerStateChange,
            }
        });
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    onPlayerStateChange(e) {
        if (e.data === window.YT.PlayerState.PLAYING) {
            console.log('playing')
        }
        if (e.data === window.YT.PlayerState.PAUSED) {
            console.log("YouTube Video is PAUSED!!");
        }
        if (e.data === window.YT.PlayerState.ENDED) {
            console.log("YouTube Video is ENDING!!");
        }
    }

    onPlayerReady(e) {
        e.target.playVideo();
    }

    async search(search_term) {
        var query = search_term[0]
        axios
        .get("https://www.googleapis.com/youtube/v3/search?key=" + this.state.apiKey + "&q=" + query + "&part=snippet&maxResults=1&type=video")
        .then((response) => {
            // var joined = this.state.query_IDs.concat(response.data.items[0].id.videoId);
            var changed = this.state.query_IDs
            // search_term[2]] is the index of the original search. Set that same index in the query_IDS to the youtube-video-id
            changed[search_term[2]] = response.data.items[0].id.videoId
            this.setState({
                query_IDs: changed, 
            }, () => {
                console.log(this.state.query_IDs)
            })
        })
        .catch((error) => {
            console.log(error)
        });
    } 

    createButtons() {
        var button_list = []
        var current_index = this.state.current_index;
        var size = this.state.length;
        var playlist_tracks = this.state.search_terms;

        if (current_index >= 1) {
            button_list.push(button_list.push(<Button className="spotify-youtube-previous-button" key={playlist_tracks[current_index-1][1]}>  {playlist_tracks[current_index-1][0]} </Button>))
        }
        button_list.push(<Button className="spotify-youtube-current-button" key={playlist_tracks[current_index][1]}>  {playlist_tracks[current_index][0]} </Button>)
        
        for (let i=current_index+1; i < current_index+5; i++) {
            if (i < size-1) {
                button_list.push(<Button className="spotify-youtube-next-buttons" key={playlist_tracks[i][1]}>  {playlist_tracks[i][0]} </Button>)
            }
        }
        return button_list
    }
    render() {
        return(
            <div>
                <div className="button-container">
                    <Link to="/pickPlaylist">
                        <Button className="spotify-youtube-back-button">
                            Back
                        </Button>
                    </Link>
                    {this.createButtons()}
                </div>
                 <div id="player"></div>
            </div>
        )
    }
}


  

export default Youtube

// https://github.com/tjallingt/react-youtube

        // const opts = {
        //     height: '400',
        //     width: '640',
        //     origin: "https://localhost:8000",
        //     widget_referrer: "https://localhost:8000",
        //     playerVars: {
        //         enablejsapi: 1,
        //         playlist: [],

        //     }
        // }