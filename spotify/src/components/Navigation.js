import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import {Link} from 'react-router-dom';
import "../css/navigation.css"


class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            scrollPos: window.pageYOffset,
            show: true,
        }
    }
    render () {
        return(
            <Navbar className="Navigation">
                <Link to={"/" + this.props.back}>
                    <img className="playlist-back-button" src={require("../images/green-left-icon-arrow-left.png")} alt="Green Left Arrow" height="30" />
                </Link>
                <div> 
                    {this.props.children}
                </div>
            </Navbar> 
        )
    }
}

export default NavigationBar