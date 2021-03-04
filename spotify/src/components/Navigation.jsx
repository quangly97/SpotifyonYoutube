import React, { Component } from 'react';
import { Navbar } from "react-bootstrap";
import {Link} from 'react-router-dom';
import greenLeftArrow from "../images/green-left-icon-arrow-left.png"
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/navigation.css"



class NavigationBar extends Component {
    render () {
        const {back, children} = this.props
        return(
            <Navbar className="navigation">
                <Link to={"/" + back}>
                    <img className="navigation-back-button" src={greenLeftArrow}alt="Green Left Arrow" height="30" />
                </Link>
                <div> 
                    {children}
                </div>
            </Navbar> 
        )
    }
}

export default NavigationBar