// import React, { Component} from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Spotify from "spotify-web-api-js";
// import {Link} from 'react-router-dom';
// import {Button} from "react-bootstrap";
// import css from "./PlaylistButton.module.css"

// const spotifyWebApi = new Spotify();

// class PlaylistButton extends Component {
//     constructor(props) {
//         super(props);
//         this.playlistID = this.props.id;
//         this.playlistName = this.props.name;
//     }
//     render () {
//         return (
//             <div className="playlist-button-and-image-container">
//                 <Link to= {{
//                     pathname: "/youtube",
//                     playlistID: this.playlistID,
//                     }}>
//                     <Button className="playlist-button">{this.playlistName}</Button>
//                     <img className="playlist-image" src={this.props.image} alt={this.playlistName}/>
//                 </Link>
//             </div>
//         )
//     }
// }
// export default PlaylistButton