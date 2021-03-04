import React, { Component } from 'react';
import LoginCard from '../components/LoginCard'

import "../css/home.css"


class Home extends Component {
    render() {
        return(
            <div className="home-page">
                <LoginCard />
          </div>
        )
    }
}

export default Home;