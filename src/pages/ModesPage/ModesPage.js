import React from 'react';
import { useLocation } from "react-router-dom"
import ModeCard from '../../components/ModeCard/ModeCard';

import dynamicImg from "./dynamic.jpg";
import playlistImg from "./monkey-with-headphones.jpg";

import Navigation from "../../components/Navigation/Navigation";

import css from "./ModesPage.module.css"

const Modes = (props) => {
    const query = new URLSearchParams(props.location.search);
    const access_token = query.get('access_token')
    const refresh_token = query.get('refresh_token')
    if (access_token) localStorage.setItem('access_token', access_token)
    if (refresh_token) localStorage.setItem('refresh_token', refresh_token)
    return(
        <div className="modesPage">
            <Navigation back="login"/>
            <div className={css.titleContainer}>
                    Pick a Mode
            </div>
            <div className={css.modesContainer}>
                <ModeCard id="dynamic" img={dynamicImg} descriptionText="Control Youtube from your Spotify app"/>
                {/* <ModeCard id="playlist" img={playlistImg} descriptionText="Watch videos from your Spotify playlist"/> */}
            </div>
        </div>
    )
}

export default Modes


// constructor () {
//     super();
//     this.access_token = this.getHashParams();
// }
// getHashParams = () => {
//     if (window.location.href.split("/")[4]) {
//         let queryParams = window.location.href.split("/")[4]
//         let tokenList = [queryParams.split("&")[0], queryParams.split("&")[1]]
//         tokenList = tokenList.map((token) => {
//             return token.split("=")[1]
//         })
//         spotifyWebApi.setAccessToken(tokenList[0])
//         localStorage.setItem("access_token", tokenList[0])
//         localStorage.setItem("refresh_token", tokenList[1])
//         return tokenList[0]
//     }
// }