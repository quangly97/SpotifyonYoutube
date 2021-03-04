import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom";
import { Button, Spinner} from "react-bootstrap";
import greenLeftArrow from "../images/green-left-icon-arrow-left.png"
import "../css/youtube.css"
import Spotify from 'spotify-web-api-js'
import Typed from 'react-typed';

const spotifyWebApi =  new Spotify();
class Youtube extends Component {
    constructor(props) {
        super(props);
        if (this.props.history.location.playlistID) localStorage.setItem("playlistID", this.props.history.location.playlistID);
        this.playlistID = localStorage.getItem("playlistID")
        this.state = {
            apiKey: "AIzaSyAUlBPBvCwXcYNNahVcmWPKphhIs4YjaWQ",
            search_terms: [],
            current_index: 0,
            query_IDs: [],
            lyric_IDs: [],
            lyric: false,
            last_updated: 0,
            fetching: false
        }
    }

    async componentDidMount() {
        // Get all tracks
        await spotifyWebApi.getPlaylistTracks(this.playlistID).then((response) => {
            this.numOfTracks = response.total
            this.setState({numOfTracks: this.numOfTracks})
        })
        await this.loop(this.numOfTracks, this.playlistID)

        // Search Songs
        await this.search2(0, Math.min(5, this.numOfTracks));

        // Load Video
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

    loop = async (numOfTracks, ID) => {

        let allItems = []
        for (let i=0; i < Math.ceil(numOfTracks / 100); i++) {
            var r = await spotifyWebApi.getPlaylistTracks(ID, {offset: i*100}).then(response => {return response})
            allItems.push(r)
        }
        let groupsOfHundredTrackDetails = allItems.map(groupOfHundredItems => {
            return groupOfHundredItems.items
        })

        let trackDetails = [].concat.apply([], groupsOfHundredTrackDetails);

        let tracks = trackDetails.map(item => {
            return  {
                album_name: item.track.album.name,
                album_images: item.track.album.images,
                artists: item.track.artists.map((artist) => {return artist.name}),
                duration: item.track.duration_ms,
                track_name: item.track.name,
                date: item.added_at,
                id: item.track.id,
            }
        })

        tracks = this.shuffleArray(tracks)

        let search_terms = tracks.map((track, index) => {
            return {
                track_name: track.track_name + " - " + track.artists[0],
                spotify_id: track.id,
                query_index: index
            }

        })
        this.setState({tracks, search_terms, query_IDs: Array(numOfTracks).fill(null), lyric_IDs: Array(numOfTracks).fill(null)})
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
    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    onPlayerReady(e) {
        e.target.playVideo();
    }

    onPlayerStateChange = (e) => {
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

    search2 = async (start, end) => {
        this.controller = new AbortController();
        const signal = this.controller.signal;

        var data = {
            search_terms: this.state.search_terms.slice(start, end),
            query_IDs: this.state.query_IDs,
            lyric_IDs: this.state.lyric_IDs,
        }

        this.setState({
             fetching: true
        })

        const response = await fetch(process.env.REACT_APP_BACK_END_URL.concat("/youtube_search"), { 
                method: 'POST',
                signal: signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })



        const body = await response.json()
        for (var last_updated = 0; last_updated < this.state.numOfTracks; last_updated++) {
            if (!body.query_IDs[last_updated] || !body.lyric_IDs[last_updated]) {
                this.setState({last_updated});
                console.log("done", last_updated);
                break;
            }
        }
        this.setState({
            query_IDs: body.query_IDs,
            lyric_IDs: body.lyric_IDs,
            fetching: false        
        })
    }

    createButtons() {
        let button_list = []
        let current_index = this.state.current_index;
        let size = this.state.numOfTracks;
        let search_terms = this.state.search_terms;
        let query_IDs = this.state.query_IDs;

        for (let i = 4; i > 0; i--)
            if (current_index >= i) {
                button_list.push(<Button onClick={() => {this.handleQueueClick(current_index-i)}} className="spotify-youtube-previous-button" key={current_index-i} disabled={query_IDs[current_index-i] === null}>  {search_terms[current_index-i].track_name} </Button>)
            }
        button_list.push(<Button className="spotify-youtube-current-button" key={current_index} disabled={query_IDs[current_index] === null}>  {search_terms[current_index].track_name}  </Button>)
        
        for (let i=current_index+1; i < current_index+6; i++) {
            if (i < size-1) {
                button_list.push(<Button onClick={() => {this.handleQueueClick(i)}} className="spotify-youtube-next-buttons" key={i} disabled={query_IDs[i] === null}>  {search_terms[i].track_name} </Button>)
            }
        }
        return button_list
    }
    handleQueueClick = (index) =>  {
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
        if (this.controller) this.controller.abort()
    }

    render() {
        var last_updated = this.state.last_updated
        if (!this.state.tracks) return  <Typed
            typedRef={(typed) => { this.typed = typed; }}
            strings={['Do not go back...', 'Loading...', 'Do not refresh the page...', "Retrieving links from Youtube...", "Getting HD quality links...", "Getting lyric videos...", "Load"]}
            typeSpeed={30}
            className="loading-typed"
            loop
        />
        return(
            <div>
                <div className="button-container">
                    <Link to="/playlist">
                        <img className="youtube-back-button" src={greenLeftArrow} alt="Green Left Arrow" height="30" />
                    </Link>
                    <Button className="youtube-lyric-button" onClick={()=> this.handleLyricToggleClick()} disabled={this.state.query_IDs[this.state.current_index]=== null}>
                        {this.state.lyric === true ? "Music Video" :  "Lyric Video"}
                    </Button>
                    {this.createButtons()}
                </div>
                    <div className="player-and-sidebar">
                        <div id="player" />
                        <div className="sidebar"/>
                            {this.state.fetching ? 
                            <div className="typed-and-spinner">
                                <div style={{"width":"200px"}}>
                                    <Typed
                                        typedRef={(typed) => { this.typed = typed; }}
                                        strings={['Do not go back...', 'Loading...', 'Do not refresh the page...', "Retrieving links from Youtube...", "Getting HD quality links...", "Getting lyric videos...", "Load"]}
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
                                <Button className="youtube-load-more-button" key="Load20" onClick={()=>{this.search2(this.state.last_updated, Math.max(last_updated+20, this.state.numOfTracks-1) )}} disabled={this.state.query_IDs[this.state.current_index]=== 0 || this.state.fetching}> Load Next 20 </Button>
                                <Button className="youtube-load-more-button" key="Load50" onClick={()=>{this.search2(this.staate.last_updated, Math.max(last_updated+50, this.state.numOfTracks-1))}} disabled={this.state.query_IDs[this.state.current_index]=== 0 || this.state.fetching}>  Load Next 50 </Button>
                                <Button className="youtube-load-more-button" key="LoadAll" onClick={()=>{this.search2(this.state.last_updated, this.state.numOfTracks-1)}} disabled={this.state.query_IDs[this.state.current_index]=== 0 || this.state.fetching}> Load All Songs </Button>
                            </div>}
                    </div>
                </div>
        )
    }
}


  

export default  withRouter(Youtube)


// //
// async search(search_term) {
//     var query = search_term[0]
//     axios
//     .get("https://www.googleapis.com/youtube/v3/search?key=" + this.state.apiKey + "&q=" + query + "&part=snippet&maxResults=1&type=video")
//     .then((response) => {
//         // var joined = this.state.query_IDs.concat(response.data.items[0].id.videoId);
//         var changed = this.state.query_IDs
//         // search_term[2]] is the index of the original search. Set that same index in the query_IDS to the youtube-video-id
//         changed[search_term[2]] = response.data.items[0].id.videoId
//         this.setState({
//             query_IDs: changed, 
//         }, () => {
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })