import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import "../css/dynamic.css"
import NavigationBar from "../components/Navigation"

const spotifyWebApi = new Spotify();

class Dynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotify_id: "",
            is_playing: false,
            query_IDs: [0],
            lyric_IDs: [0],
            first_video: true
        }
        // Set Access Token for Use
        spotifyWebApi.setAccessToken(localStorage.getItem("access_token"))
        this.is_interval = true
        this.search = this.search.bind(this)
        this.loadVideo = this.loadVideo.bind(this)
        this.checkStatus = this.checkStatus.bind(this)
    }
    async componentDidMount () {
        // If this is the first video, we are goin to load the script
        if (this.state.first_video) {
            spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
                if (response.item) {
                    this.setState({
                        spotify_id: response.item.id
                    }, async () => {
                        console.log(this.state.first_video)
                        await this.search([response.item.name + " - " + response.item.artists[0].name, response.item.id, 0])
                        if (!window.YT) {
                            const tag = document.createElement('script');
                            tag.src = 'https://www.youtube.com/iframe_api'
                            window.onYouTubeIframeAPIReady = async () => {
                                this.loadVideo(this.state.query_IDs[0])
                            }

                            const firstScriptTag = document.getElementsByTagName('script')[0];
                            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                            
                        }
                        else {
                            this.loadVideo(this.state.query_IDs[0])
                        }
                        this.setState({ first_video: false })
                        
                    })
                }
                else {  
                    spotifyWebApi.getMyRecentlyPlayedTracks().then((response) => {
                        this.setState({
                            spotify_id: response.items[0].track.id
                        }, async () => {
                            await this.search([response.items[0].track.name + " - " + response.items[0].track.artists[0].name, response.items[0].track.id, 0])
                            if (!window.YT) {
                                const tag = document.createElement('script');
                                tag.src = 'https://www.youtube.com/iframe_api'
                                window.onYouTubeIframeAPIReady = () => {this.loadVideo(this.state.query_IDs[0])};
                                const firstScriptTag = document.getElementsByTagName('script')[0];
                                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                            }
                            else {
                                this.loadVideo(this.state.query_IDs[0]);
                            }
                            this.setState({ first_video: false })
                            
                        })
                    })
                }
            })
        }
  
        this.interval = setInterval(() => {
            if (this.is_interval) {
                 this.checkStatus()
            }
        }, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        console.log("cleared")
    }


    checkStatus () {
        spotifyWebApi.getMyCurrentPlaybackState().then((response) => {

            if (response.shuffle_state === true) {
                document.getElementById('pause').click()
            }
            else (
                document.getElementById('play').click()
            )


            if (response.repeat_state === "context") {
                this.handleLyricToggleClick()
                spotifyWebApi.setRepeat("off")

            }

            if (response.item && (response.item.id !== this.state.spotify_id)) {
                this.is_interval = false;
                this.setState({
                    spotify_id: response.item.id,
                    lyric: false
                }, async () => {
                    await this.search([response.item.name + " - " + response.item.artists[0].name, response.item.id, 0])
                    await this.player.loadVideoById(this.state.query_IDs[0]);
                    spotifyWebApi.pause().catch((error) => { console.log(error)});
                    this.is_interval = true;
                })
            } 
        })

    }

    
    async search(search_term) {
        this.controller = new AbortController();
        const signal = this.controller.signal;

        var data = {
            search_terms: [search_term],
            query_IDs: this.state.query_IDs,
            lyric_IDs: this.state.lyric_IDs,
        }
        this.setState({
            fetching: true,
        })
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
        this.setState(
            {
                query_IDs: body.query_IDs,
                lyric_IDs: body.lyric_IDs,
                fetching: false,
            }, () => {
                if (!this.state.first_video) {
                    this.player.loadVideoById(body.query_IDs[0])
                }
                this.is_interval = true;
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
    
    handleLyricToggleClick() {
        this.setState({
            lyric: !this.state.lyric,
        }, () => {
            if (this.state.lyric) {
                this.player.loadVideoById(this.state.lyric_IDs[0])
            }
            else {
                this.player.loadVideoById(this.state.query_IDs[0])
            }
            
        })
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
    onError(e) {
        if ((e.data === 101) || (e.data === 150)) {
        }
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
