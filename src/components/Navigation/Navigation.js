import React from 'react';
import { Link } from 'react-router-dom'
import css from './Navigation.module.css'
import backButton from './backLeftArrow.png'


const Navigation = (props) => {
    const { back, message } = props

    return (
        <div className={css.navigationContainer}>
            {back === "login" ? (
                <a href={`${process.env.REACT_APP_BACK_END_URL}/login`}>
                    <img className={backButton} src={backButton} alt="Green Left Arrow" height="30" />
                </a>
                ) : (
                    <Link to={{ pathname: "/"+back}}>
                        <img className={backButton} src={backButton} alt="Green Left Arrow" height="30" />
                    </Link>
                )
            }
                <div className={css.navigationMessage}>
                    {message}
                </div>
            
        </div> 
    )
}


export default Navigation;
