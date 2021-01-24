import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import {Button} from "react-bootstrap";
import "../css/dynamic.css"
import NavigationBar from "../components/Navigation"

const spotifyWebApi = new Spotify();

class Dynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lyric: false,
        }
        this.spotify_id = "";
        this.query_IDs =  [0];
        this.lyric_IDs =  [0];
        this.first_video = true;
        this.current_state = "stopped";

        // Set Access Token for Use
        spotifyWebApi.setAccessToken(localStorage.getItem("access_token"))
        this.is_interval = true
        this.search = this.search.bind(this)
        this.loadVideo = this.loadVideo.bind(this)
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
        this.handleLyricToggleClick = this.handleLyricToggleClick.bind(this)
        this.checkStatus = this.checkStatus.bind(this)
        this.onPlayerReady = this.onPlayerReady.bind(this) 
    }
    componentWillUnmount () {
        this.controller.abort()
        clearInterval(this.interval)
        console.log("cleared")
    }

    async componentDidMount () {
        // If this is the first video, we are going to load the script
        if (this.first_video) {
            spotifyWebApi.getMyCurrentPlaybackState().then(async (response) => {
                // 
                if (response.item) {

                    this.spotify_id = response.item.id
                    await this.search([response.item.name + " - " + response.item.artists[0].name, response.item.id, 0])

                    if (!window.YT) {
                        // Adding Script Element
                        const tag = document.createElement('script');
                        tag.src = 'https://www.youtube.com/iframe_api'
                        window.onYouTubeIframeAPIReady =  () => { this.loadVideo(this.query_IDs[0])}
                        const firstScriptTag = document.getElementsByTagName('script')[0];
                        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    }
                    else {
                        this.loadVideo(this.query_IDs[0])
                    }
                    this.first_video = false;  
                }

                else {
                    // If nothign is currently playing, get recently playing tracks
                    spotifyWebApi.getMyRecentlyPlayedTracks().then(async (response) => {
                        this.spotify_id = response.items[0].track.id
                        await this.search([response.items[0].track.name + " - " + response.items[0].track.artists[0].name, response.items[0].track.id, 0])
                        
                        if (!window.YT) {
                            // Adding Script Element
                            const tag = document.createElement('script');
                            tag.src = 'https://www.youtube.com/iframe_api'
                            window.onYouTubeIframeAPIReady = () => {this.loadVideo(this.query_IDs[0])};
                            const firstScriptTag = document.getElementsByTagName('script')[0];
                            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                        }
                        else {
                            this.loadVideo(this.query_IDs[0]);
                        }
                        this.first_video = false;
                            
                    })
                }
            })
        }

        // Check status every x milliseconds
        this.interval = setInterval(() => {
            if (this.is_interval) {
                 this.checkStatus()
            }
        }, 2500)
    }

    checkStatus () {

        spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
            // If shuffle, pause, if not,  play.
            if ((response.shuffle_state === true) && (this.current_state="playing")) {
                document.getElementById('pause').click()
                this.current_state = "paused"
            }
            else if ((response.shuffle_state === false) && (this.current_state="paused")) {
                document.getElementById('play').click()
                this.current_state = "playing"
            }

            // If on repeat, toggle lyric video/music video
            if (response.repeat_state === "context") {
                if (!this.first_video) {
                    this.handleLyricToggleClick()
                    spotifyWebApi.setRepeat("off")
                }

            }

            // If it's playing and its not our current
            if (response.item && (response.item.id !== this.spotify_id)) {
                this.is_interval = false;
                this.spotify_id = response.item.id;
                this.setState({
                    lyric: false
                }, async () => {
                    await this.search([response.item.name + " - " + response.item.artists[0].name, response.item.id, 0])
                    await this.player.loadVideoById(this.query_IDs[0]);
                    this.current_state = "playing"
                    this.is_interval = true;
                    if (response.is_playing) {
                        spotifyWebApi.pause()
                    }
                })
            } 
        })

    }

    
    async search(search_term) {
        // Creating a signal so we can abort the fetch request when we unmout
        this.controller = new AbortController();
        const signal = this.controller.signal;

        var data = {
            search_terms: [search_term],
            query_IDs: this.query_IDs,
            lyric_IDs: this.lyric_IDs,
        }
        this.fetching = true
        const response = await fetch('http://localhost:8888/youtube_search', {   
            method: 'POST',
                signal: signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })

        const body = await response.json()
        this.query_IDs =  body.query_IDs;
        this.lyric_IDs = body.lyric_IDs;
        this.fetching =  false;

        if (!this.first_video) {
            this.player.loadVideoById(body.query_IDs[0])
            this.current_state = "playing"
        }
        this.is_interval = true;

    }

    loadVideo = (id) => {
        this.player = new window.YT.Player('player', {
            height: '720',
            width: '1280',
            videoId: id,
            playerVars: {
                controls: 1,
                autoplay: 0,
                disablekb: 1,
                enablejsapi: 1,
         },
        events: {
            'onReady': this.onPlayerReady,
            'onStateChange': this.onPlayerStateChange,
            'onError': this.onError,
        }
        });
    }
    

    onPlayerReady(e) {
        document.getElementById('pause').addEventListener('click', function() {
            e.target.pauseVideo();
        })
        document.getElementById('play').addEventListener('click', function() {
            e.target.playVideo();
        })
        e.target.playVideo();
    }

    onPlayerStateChange(e) {
        if (e.data === window.YT.PlayerState.PLAYING) {
            this.current_state = "playing"
        }
        if (e.data === window.YT.PlayerState.PAUSED) {
            this.current_state = "paused"
        }
        if (e.data === window.YT.PlayerState.ENDED) {
            this.player.loadVideoById(this.query_IDs[0])
        }
    }
    onError(e) {
        if ((e.data === 101) || (e.data === 150)) {
        }
    }

    handleLyricToggleClick() {
        this.setState({
            lyric: !this.state.lyric,
        }, () => {
            if (this.state.lyric) {
                this.player.loadVideoById(this.lyric_IDs[0])
            }
            else {
                this.player.loadVideoById(this.query_IDs[0])
            }
            
        })
    }

    render () {
        return (
            <div> 
                <NavigationBar back="modes">
                    <Button className="dynamic-lyric-button" onClick={()=> this.handleLyricToggleClick()}>
                            {this.state.lyric ? "Music Video" :  "Lyric Video"}
                    </Button>
                </NavigationBar>
                <div className = "player-container">
                    <div id="player"> </div>
                    <Button id="pause" className="invisible">Pause</Button>
                    <Button id="play" className="invisible">Play</Button>
                </div>
            </div>)
            
    }
}


export default Dynamic
