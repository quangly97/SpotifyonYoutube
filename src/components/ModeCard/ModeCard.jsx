import React from 'react';
import {Link} from 'react-router-dom';
import css from './ModeCard.module.css'

const ModeCard = (props) => {
    const { id, img, descriptionText } = props
    return (
        <div className={css.modeCardContainer}>
            <div className={css.modeCard}>
                <Link to={`/${id}`}>
                    <button className={css.modeButton}> {id} </button>
                    <div className={css.modeCardInner}>
                        <div className={css.modeCardFront}>
                        <img className={css.modeImage} src={img} alt=""/>
                        </div>
                        <div className={css.modeCardBack}>
                            <span className={css.modeCardBackText}>{descriptionText} </span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

 
export default ModeCard ;