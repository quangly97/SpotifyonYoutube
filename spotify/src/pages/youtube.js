import axios from 'axios';
import React, { Component } from 'react';
import {Link} from "react-router-dom"
import { Button } from "react-bootstrap";
import "../css/pickPlaylist.css"
import Spotify from 'spotify-web-api-js'

const spotifyWebApi =  new Spotify();
class Youtube extends Component {
    constructor(props) {
        super(props);
        if  (this.props.location.tracks) {
            localStorage.setItem("tracks",  JSON.stringify(this.shuffleArray(this.props.location.tracks)))
            localStorage.setItem("playlist", JSON.stringify(this.props.location.playlistName))
            localStorage.setItem("length", JSON.stringify(this.props.location.tracks.length))
        }

        this.state = {
            apiKey: "AIzaSyAUlBPBvCwXcYNNahVcmWPKphhIs4YjaWQ",
            playingstate: "",
            search_terms: localStorage.getItem("tracks") ? 
            JSON.parse(localStorage.getItem("tracks")).map((track, index) => {
                return [track.artists[0] + " - " + track.track_name, track.id, index];
            }) : "",
            current_playing: 2,
            length: JSON.parse(localStorage.getItem("length")),
            query_ID: [],
        }

        spotifyWebApi.setAccessToken(localStorage.getItem("access_token"));
        const opts = {
            height: '400',
            width: '640',
            origin: "https://localhost:8000",
            widget_referrer: "https://localhost:8000",
            playerVars: {
                enablejsapi: 1,
                playlist: [],

            }
        }

        this.search = this.search.bind(this)
        this.loadVideo = this.loadVideo.bind(this)
    }
    componentDidMount() {
        for (let i=0; i< this.state.search_terms.length; i++) {
            this.search(this.state.search_terms[i][0], this.state.search_terms[i][1])
        }
        console.log(this.state.query_ID)
        spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
            console.log(response)
            if (response === "") {
                console.log("nothing has been playing for the past 15 minutes")
            }
            else if ((response !== "") & (response.is_playing===false)) {
                console.log("nothing is currently playing right now")
                spotifyWebApi.play((response) => {
                    console.log("play");
                })
            }
            else {
                console.log(response.is_playing)
                console.log(response.item.name)
                console.log(response.item.artists[0].name)
                console.log(response.item.id)
                spotifyWebApi.pause((response) => {
                    console.log(response, "stop");
                })
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
            videoId: 'M7lc1UVf-VE',
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
    async search(query) {
        axios
        .get("https://www.googleapis.com/youtube/v3/search?key=" + this.state.apiKey + "&q=" + query + "&part=snippet&maxResults=2&type=video")
        .then((response) => {
            var joined = this.state.query_ID.concat(response.data.items[0].id.videoId);
            this.setState({
                query_ID: joined, 
            }, () => {
                console.log(this.state.query_ID)
            })
        })
        .catch((error) => {
            console.log(error)
        });
    } 

    createButtons() {
        var button_list = []
        for (let i=this.state.current_playing-1; i < 4; i++) {
            if ((i >= 0)  & (i < this.state.length)) {
                button_list.push(<Button className="spotify-youtube-back-button" key={this.state.search_terms[i][1]}>  {this.state.search_terms[i][0]} </Button>)
            }
        }
        return button_list
    }
    render() {
        return(
            <div>
                <Link to="/pickPlaylist">
                    <Button className="spotify-youtube-back-button">
                        Back
                    </Button>
                </Link>
                <Button className="spotify-youtube-back-button"> Play </Button>
                <div>
                    {this.createButtons()}
                </div>
                {/* <Button className="spotify-youtube-back-button">  {this.state.search_terms[this.state.current_playing-1][0]} </Button>
                <Button className="spotify-youtube-back-button"> {this.state.search_terms[this.state.current_playing][0]}</Button>
                <Button className="spotify-youtube-back-button"> {this.state.search_terms[this.state.current_playing+1][0]}</Button> */}
                 <div id="player"></div>
            </div>
        )
    }
}


  

export default Youtube

// https://github.com/tjallingt/react-youtube