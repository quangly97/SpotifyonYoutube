import axios from 'axios';
import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom";
import { Button, Spinner} from "react-bootstrap";
import "../css/youtube.css"
import Spotify from 'spotify-web-api-js'
import Typed from 'react-typed';

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

        console.log(this.props.location.tracks)
        
        // Search Terms syntax is - ["title", "spotify-id", index in the search-terms array]
        this.state = {
            apiKey: "AIzaSyAUlBPBvCwXcYNNahVcmWPKphhIs4YjaWQ",
            search_terms: localStorage.getItem("tracks") ? 
            JSON.parse(localStorage.getItem("tracks")).map((track, index) => {
                return [track.artists[0] + " - " + track.track_name, track.id, index];
            }) : "",
            current_index: 0,
            length: JSON.parse(localStorage.getItem("length")),
            query_IDs: Array(JSON.parse(localStorage.getItem("length"))).fill(0),
            lyric_IDs: Array(JSON.parse(localStorage.getItem("length"))).fill(0),
            lyric: false,
            last_updated: 0,
            fetching: false
        }

        console.log(this.state.search_terms)

        this._isMounted = false;

        this.search2 = this.search2.bind(this)
        this.loadVideo = this.loadVideo.bind(this)
        this.handleQueueClick = this.handleQueueClick.bind(this)
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
    }
    async componentDidMount() {
        await this.search2(7, Math.min(5, this.state.length));
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
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    onPlayerReady(e) {
        e.target.playVideo();
    }

    onPlayerStateChange(e) {
        if (e.data === window.YT.PlayerState.ENDED) {
            console.log("YouTube Video is ENDING!!");
            this.handleQueueClick(this.state.current_index+1);
        }
    }

    onError(e) {
        if ((e.data === 101) || (e.data === 150)) {
            this.handleQueueClick(this.state.current_index+1);
        }

    }

    async search2(start, end) {
        this.controller = new AbortController();
        const signal = this.controller.signal;

        var data = {
            search_terms: this.state.search_terms.slice(start, end),
            query_IDs: this.state.query_IDs,
            lyric_IDs: this.state.lyric_IDs,
        }

        console.log(data)
        this.setState({
             fetching: true
        })

        this._isMounted = true;
        const response = await fetch('/youtube_search', { 
                method: 'POST',
                signal: signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })


        if (this._isMounted) {
            const body = await response.json()
            console.log(body)
            this.setState({
                query_IDs: body.query_IDs,
                lyric_IDs: body.lyric_IDs,
                last_updated: end,
                fetching: false        
            })
            this._isMounted = false
        }
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
        var query_IDs = this.state.query_IDs;

        for (let i = 4; i > 0; i--)
            if (current_index >= i) {
                button_list.push(<Button onClick={() => {this.handleQueueClick(current_index-i)}} className="spotify-youtube-previous-button" key={current_index-i} disabled={query_IDs[current_index-i] === 0}>  {playlist_tracks[current_index-i][0]} </Button>)
            }
        button_list.push(<Button className="spotify-youtube-current-button" key={current_index} disabled={query_IDs[current_index] === 0}>  {playlist_tracks[current_index][0]}  </Button>)
        
        for (let i=current_index+1; i < current_index+6; i++) {
            if (i < size-1) {
                button_list.push(<Button onClick={() => {this.handleQueueClick(i)}} className="spotify-youtube-next-buttons" key={i} disabled={query_IDs[i] === 0}>  {playlist_tracks[i][0]} </Button>)
            }
        }
        return button_list
    }
    handleQueueClick(index) {
        this.setState({
            current_index: index,
            lyric: false,
        }, () => {
            console.log(this.state.current_index)
            this.player.loadVideoById(this.state.query_IDs[this.state.current_index])
        })
    }

    handleLyricToggleClick() {
        this.setState({
            lyric: !this.state.lyric,
        }, () => {
            if (this.state.lyric) {
                this.player.loadVideoById(this.state.lyric_IDs[this.state.current_index])
            }
            else {
                this.player.loadVideoById(this.state.query_IDs[this.state.current_index])
            }
            
        })
    }

    componentWillUnmount() {
        this.controller.abort()
        this._isMounted = false
    }

    render() {
        var last_updated = this.state.last_updated
        return(
            <div>
                <div className="button-container">
                    <Link to="/pickPlaylist">
                        <img className="youtube-back-button" src={require("../images/green-left-icon-arrow-left.png")} alt="Green Left Arrow" height="30" />
                    </Link>
                    <Button className="youtube-lyric-button" onClick={()=> this.handleLyricToggleClick()} disabled={this.state.query_IDs[this.state.current_index]=== 0}>
                        {this.state.lyric === true ? "Music Video" :  "Lyric Video"}
                    </Button>
                    {this.createButtons()}
                </div>
                    <div className="player-and-sidebar">
                        <div id="player" />
                        <div className="sidebar"/>
                            {this.state.fetching ? 
                            <div className="typed-and-spinner">
                                <div>
                                    <Typed
                                        typedRef={(typed) => { this.typed = typed; }}
                                        strings={['Loading...', "Retrieving links from Youtube...", "Getting HD quality links...", "Getting lyric videos...", "Load"]}
                                        typeSpeed={30}
                                        className="loading-typed"
                                        loop
                                    />
                                </div>
                                <div>
                                    <Spinner animation="border" className="loading-spinner" />
                                </div>
                            </div> :
                            <div>
                                <Button className="youtube-load-more-button" key="Load20" onClick={()=>{this.search2(last_updated, last_updated+20 )}} disabled={this.state.query_IDs[this.state.current_index]=== 0 || this.state.fetching}> Load Next 20 </Button>
                                <Button className="youtube-load-more-button" key="Load50" onClick={()=>{this.search2(last_updated, last_updated+50)}} disabled={this.state.query_IDs[this.state.current_index]=== 0 || this.state.fetching}>  Load Next 50 </Button>
                                <Button className="youtube-load-more-button" key="LoadAll" onClick={()=>{this.search2(last_updated, this.state.length-1)}} disabled={this.state.query_IDs[this.state.current_index]=== 0 || this.state.fetching}> Load All Songs </Button>
                            </div>}
                    </div>
                </div>
        )
    }
}


  

export default  withRouter(Youtube)