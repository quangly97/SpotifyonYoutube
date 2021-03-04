import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import "../css/modes.css"

class ModeCard extends Component {
    render() { 
        const { id, img } = this.props
        const imageClassName = id.concat("-image")
        const imageButtonName = id.concat("-button")
        return (
        <Link to={`/${id}`}>
            <Button className={imageButtonName}> {id} </Button>
            <img className={imageClassName} src={img} alt=""/>
        </Link>
        );
    }
}
 
export default ModeCard ;