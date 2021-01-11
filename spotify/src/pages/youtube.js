import axios from 'axios';
import React, { Component } from 'react';
import YouTube from 'react-youtube';
import {
    Button
  } from "react-bootstrap";
import "../css/pickPlaylist.css"

const YTPlayer = require('yt-player')

class Youtube extends Component {
    constructor() {
        super();
        this.state = {
            apiKey: "AIzaSyAUlBPBvCwXcYNNahVcmWPKphhIs4YjaWQ",
            searchTerm: "",
            songName: "",
            playlists: [],
        }
        const opts = {
            height: '400',
            width: '640',
            playerVars: {
                enablejsapi: 1,
                playlist: [],
            }
        }
        let YT
        this.search = this.search.bind(this)
    }
    componentDidMount() {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = (e) => {
            this.YT = window.YT;
            this.player = new window.YT.Player('player', {
                height: '390',
                width: '640',
                videoId: 'M7lc1UVf-VE',
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                }
            });
        }
    }
    onPlayerStateChange(e) {
        if (e.data == window.YT.PlayerState.PLAYING) {
            console.log('playing')
        }
    }

    onPlayerReady(e) {
        e.target.playVideo();
    }
    
    createPlaylistButtons() {
        this.setState.playlists.map(playlist => {return playlist.name});
    }

    async search(query) {
        axios
        .get("https://www.googleapis.com/youtube/v3/search?key=" + this.state.apiKey + "&q=" + query + "&part=snippet&maxResults=5&type=video")
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        });
    }  

    render() {
        return(
            <div>
                <div id="player"></div>
            </div>
        )
    }
}


  

export default Youtube

// https://github.com/tjallingt/react-youtube