import axios from 'axios';
import React, { Component } from 'react';
import PlaylistButton from "../components/PlaylistButton"
import {Link} from "react-router-dom"
import { Button } from "react-bootstrap";
import "../css/pickPlaylist.css"

class Youtube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: "AIzaSyAUlBPBvCwXcYNNahVcmWPKphhIs4YjaWQ",
            // search_terms: this.props.location.tracks.map((track) => {
            //     return track.artists[0] + " " + track.track_name;
            // }),
            query_IDs: [],
        }
        const opts = {
            height: '400',
            width: '640',
            playerVars: {
                enablejsapi: 1,
                playlist: [],
            }
        }

        this.search = this.search.bind(this)
    }
    componentDidMount() {
        
        // this.state.search_terms.forEach((search_term, index) => {
        //     this.search(search_term, index)
        //     console.log(search_term, index)
        // })
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = (e) => {
            this.YT = window.YT;
            this.player = new window.YT.Player('player', {
                height: '640',
                width: '1320',
                videoId: 'M7lc1UVf-VE',
                playerVars: {
                    controls: 1,
                    autoplay: 0,
                    disablekb: 1,
                    enablejsapi: 1,
                },
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange,
                }
            });
        }
    }

    onPlayerStateChange(e) {
        if (e.data === window.YT.PlayerState.PLAYING) {
            console.log('playing')
        }
        if (e.data == window.YT.PlayerState.PAUSED) {
            console.log("YouTube Video is PAUSED!!");
        }
        if (e.data == window.YT.PlayerState.ENDED) {
            console.log("YouTube Video is ENDING!!");
        }


    }

    onPlayerReady(e) {
        e.target.playVideo();
    }
    async search(query, index) {
        await axios
        .get("https://www.googleapis.com/youtube/v3/search?key=" + this.state.apiKey + "&q=" + query + "&part=snippet&maxResults=2&type=video")
        .then((response) => {
            this.setState({
                 query_IDs: this.state.query_IDs.push([index, query, response.data.items[0].id.videoId])
            })
        })
        .catch((error) => {
            console.log(error)
        });
    } 
    render() {
        return(
            <div>
                <Link to="/pickPlaylist">
                    <Button className="spotify-youtube-back-button">
                        Back
                    </Button>
                </Link>
                 <div id="player"></div>
            </div>
        )
    }
}


  

export default Youtube

// https://github.com/tjallingt/react-youtube