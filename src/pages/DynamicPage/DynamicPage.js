import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';

import repeatIcon from './repeatIcon.png';
import shuffleIcon from './shuffleIcon.png';
import spotifyLogo from './spotifyLogo.png'

import { getRefreshToken } from '../../util/api'

import css from  "./DynamicPage.module.css";
import Navigation from "../../components/Navigation/Navigation";

const PAUSED = "paused"
const PLAYING = "playing"

const spotifyWebApi = new Spotify();

class Dynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lyric: false,
            spotify_id: "",
            query_IDs: ["qxOkaU6RVz4"],
            lyric_IDs: [null],
            currentSong: "Loading..."
        }
        this.current_state = PLAYING
        

        // Set Access Token for Use
        const spotifyWebApi = new Spotify();
        const access_token = window.localStorage.getItem("access_token")
        spotifyWebApi.setAccessToken(access_token);
    }

    async componentDidMount () {
        // Load the video player
        this.addScriptElement()
        await spotifyWebApi.getMyCurrentPlaybackState()
        .then(async (response) => {
            if (!response.item) {
                // Not currently playing anything
                throw response
            } else {
                const {name, artists, id} = response.item
                this.spotify_id = id
                await this.search(
                    {track_name: name + " - " + artists[0].name,
                    spotify_id: id,
                    query_index: 0
                })
            }
        })
        .catch( () => {
            spotifyWebApi.getMyRecentlyPlayedTracks().then(async (response) => {
                const {name, artists, id} = response.items[0].track
                this.spotify_id = id
                await this.search(
                    {track_name: name + " - " + artists[0].name, 
                    spotify_id: id,
                    query_index: 0}
                )      
            })

        })
        window.refreshIntervalId = setInterval(() => {this.checkStatus()}, 3200)
    }
    componentWillUnmount () {
        if (this.fetching) {
            this.controller.abort()
        }
        clearInterval(window.refreshIntervalId)
        console.log("Cleared")
    }


    search = async (tracks) => {
        // tracks is in the form: 
        // track_name
        // spotifyId
        // query_index 

        console.log("Started Searching")
        this.setState({ currentSong: "Loading...", lyric: false})

        // Creating a signal so we can abort the fetch request when we unmount
        this.controller = new AbortController();
        const signal = this.controller.signal;

        // Give the server a list of track objects you want to search, and your current list of query and lyric IDs
        var data = {
            tracks: [tracks],
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
        
        this.current_state = PLAYING

        if (query_IDs[0] !== this.state.query_IDs[0]) {
            this.setState({lyric: false, query_IDs, lyric_IDs, currentSong: tracks.track_name})
            this.player.loadVideoById ? this.player.loadVideoById(this.state.query_IDs[0]) :  this.loadVideo(this.state.query_IDs[0])
        }

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
        spotifyWebApi.getMyCurrentPlaybackState()
        .then(async (response) => {
            // if (!response) {await spotifyWebApi.play(); spotifyWebApi.pause()}

            // If shuffle and playing, pause, if not,  play.
            if ((response.shuffle_state === true) && (this.current_state=PLAYING)) {
                document.getElementById('pause').click()
                this.current_state = PAUSED
            }
            else if ((response.shuffle_state === false) && (this.current_state=PAUSED)) {
                document.getElementById('play').click()
                this.current_state = PLAYING
            }

            // If on repeat, toggle lyric video/music video
            if (response.repeat_state === "context") {
                await spotifyWebApi.setRepeat("off")
                this.handleLyricToggle()
                
            }

            // If it's playing and its not our current
            if (response.item && (response.item.id !== this.spotify_id)) {
                clearInterval(window.refreshIntervalId)
                this.spotify_id = response.item.id
                const {name, artists, id} = response.item
                if (response.is_playing) {
                    spotifyWebApi.pause()
                }
                await this.search(
                    { 
                        track_name: name + " - " + artists[0].name,
                        spotify_id: id,
                        query_index: 0
                    })
                this.current_state = PLAYING

    
                window.refreshIntervalId = setInterval(() => {this.checkStatus()}, 2200)
            } 
        })
        .catch( async (error) => {
            if (!error.withCredentials) {
                const refresh_token = window.localStorage.getItem("refresh_token")
                const {access_token} = await getRefreshToken(refresh_token)
                window.localStorage.setItem("access_token", access_token)
                spotifyWebApi.setAccessToken(access_token);
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
            this.current_state = PLAYING
        }
        if (e.data === window.YT.PlayerState.PAUSED) {
            this.current_state = PAUSED
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
            this.state.lyric ? this.player.loadVideoById(this.state.lyric_IDs[0]) : this.player.loadVideoById(this.state.query_IDs[0])
        })
    }

    render () {
        const otherTypeOfVideo = this.state.lyric ? "Music Video" :  "Lyric Video"
        const message = this.state.lyric ?  this.state.currentSong + " (Lyrics)" : this.state.currentSong
        return (
            <div> 
                <Navigation back="modes" message={message}/>
                <div className={css.instructions}>
                    <div className={css.instruction}>
                        <img src={repeatIcon} className={css.repeatIcon}/>
                        <span className={css.instructionText}> Repeat on  app to change to {otherTypeOfVideo} </span>
                    </div>
                    <div className={css.instruction}>
                        <img src={spotifyLogo} className={css.spotifyLogo} />
                        <span className={css.instructionText}> Try changing songs on the app!</span>
                    </div>
                    <div className={css.instruction}>
                        <img src={shuffleIcon} className={css.shuffleIcon}/>
                        <span className={css.instructionText}>  Shuffle on app to pause/play </span>
                    </div>
                </div>
                <div className={css.playerContainer}>
                    <div id="player"></div>
                    <button id="pause" className={css.invisible}>Pause</button>
                    <button id="play" className={css.invisible}>Play</button>
                </div>
            </div>)
            
    }
}


export default Dynamic