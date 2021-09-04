import React from 'react';

import spotifyLogo from './spotifyLogo.png'
import youtubeLogo from './youtubeLogo.png'

import css from "./LandingPage.module.css"

const LandingPage = () => {
    return(
        <div className={css.landingPage}>
            <div className={css.loginContainer}>
                <div className={css.titleContainer}>
                    Ready to Connect?
                </div>
                <div className={css.imageContainer}>
                    <img src={spotifyLogo} className={css.spotifyLogo}/>
                    <img src={youtubeLogo} className={css.youtubeLogo}/>
                </div>
                <div className={css.buttonContainer}>
                    <a href={`${process.env.REACT_APP_BACK_END_URL}/login`} className={css.linkButton}>
                        <button className={css.loginButton}>
                            Login With Spotify
                        </button>
                    </a>
                </div>

            </div>
        </div>
    )
}


export default LandingPage;