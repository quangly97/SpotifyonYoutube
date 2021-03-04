import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import {Button} from "react-bootstrap";
import "../css/dynamic.css"
import NavigationBar from "../components/Navigation"
import ls from 'local-storage'

const spotifyWebApi = new Spotify();

class Dynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lyric: false,
            spotify_id: "",
            query_IDs: ["qxOkaU6RVz4"],
            lyric_IDs: [null],
            first_video: true,
            current_state: "stopped"
        }


        // Set Access Token for Use
        spotifyWebApi.setAccessToken(ls.get("access_token"))
        this.is_interval = true
    }
    componentWillUnmount () {
        if (this.fetching) {
            this.controller.abort()
        }
        clearInterval(window.refreshIntervalId)
        console.log("Cleared")
    }

    async componentDidMount () {
        // If this is the first video, we are going to load the script
        this.addScriptElement()
        spotifyWebApi.getMyCurrentPlaybackState().then(async (response) => {
            if (response.item) {
                const {name, artists, id} = response.item
                await this.search(
                    {track_name: name + " - " + artists[0].name,
                    spotify_id: id,
                    query_index: 0})
            }
            else {
                spotifyWebApi.getMyRecentlyPlayedTracks().then(async (response) => {
                    const {name, artists, id} = response.items[0].track
                    await this.search(
                        {track_name: name + " - " + artists[0].name, 
                        spotify_id: id,
                        query_index: 0}
                    )          
                })
            }
        })

        window.refreshIntervalId = setInterval(() => {this.checkStatus()}, 3200)
    }

    search = async(search_terms) => {
        console.log("Started Searching")

        // Creating a signal so we can abort the fetch request when we unmout
        this.controller = new AbortController();
        const signal = this.controller.signal;


        var data = {
            search_terms: [search_terms],
            query_IDs: [null],
            lyric_IDs: [null],
        }

        this.fetching = true
        const response = await fetch(`${process.env.REACT_APP_BACK_END_URL}/youtube_search`, {   
            method: 'POST',
                signal: signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })

        const {query_IDs, lyric_IDs} = await response.json()
        this.fetching =  false;
        
        this.current_state = "playing"

        this.setState({lyric: false, query_IDs, lyric_IDs})
        this.player.loadVideoById ? this.player.loadVideoById(this.state.query_IDs[0]) :  this.loadVideo(this.state.query_IDs[0])

    }

    addScriptElement = () => {
        if (!window.YT) {
            // Adding Script Element
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api'
            window.onYouTubeIframeAPIReady =  () => {this.loadVideo(this.state.query_IDs[0])}
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        else {
            this.loadVideo(this.state.query_IDs[0])

        }
    }

    checkStatus = () => {
        spotifyWebApi.getMyCurrentPlaybackState().then(async (response) => {
            // if (!response) {await spotifyWebApi.play(); spotifyWebApi.pause()}
            console.log(response)
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
                    this.handleLyricToggle()
            }

            // If it's playing and its not our current
            if (response.item && (response.item.id !== this.spotify_id)) {
                clearInterval(window.refreshIntervalId)
                this.spotify_id = response.item.id
                const {name, artists, id} = response.item
                await this.search(
                    {track_name: name + " - " + artists[0].name,
                    spotify_id: id,
                    query_index: 0}).then((response) => {
                    console.log(this.query_IDs)
                    this.current_state = "playing"
                    this.is_interval = true
                })
                if (response.is_playing) {
                    spotifyWebApi.pause()
                }
                window.refreshIntervalId = setInterval(() => {this.checkStatus()}, 3200)
            } 
        })

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
    

    onPlayerReady = (e) => {
        document.getElementById('pause').addEventListener('click', function() {
            e.target.pauseVideo();
        })
        document.getElementById('play').addEventListener('click', function() {
            e.target.playVideo();
        })
        e.target.playVideo();
    }

    onPlayerStateChange = (e) => {
        if (e.data === window.YT.PlayerState.PLAYING) {
            this.current_state = "playing"
        }
        if (e.data === window.YT.PlayerState.PAUSED) {
            this.current_state = "paused"
        }
        if (e.data === window.YT.PlayerState.ENDED) {
            this.player.loadVideoById(this.state.query_IDs[0])
        }
    }
    onError = (e) => {
        if ((e.data === 101) || (e.data === 150)) {
            this.player.loadVideoById(this.state.lyric_IDs[0])
        }
    }

    handleLyricToggle = () => {
        this.setState({
            lyric: !this.state.lyric,
        }, () => {
            spotifyWebApi.setRepeat("off")
            this.state.lyric ? this.player.loadVideoById(this.state.lyric_IDs[0]) : this.player.loadVideoById(this.state.query_IDs[0])
        })
    }

    render () {
        return (
            <div> 
                <NavigationBar back="modes">
                    <Button className="dynamic-lyric-button" onClick={()=> this.handleLyricToggle()}>
                            {this.state.lyric ? "Music Video" :  "Lyric Video"}
                    </Button>
                </NavigationBar>
                <div className = "player-container">
                    <div id="player"></div>
                    <Button id="pause" className="invisible">Pause</Button>
                    <Button id="play" className="invisible">Play</Button>
                </div>
            </div>)
            
    }
}


export default Dynamic
//