import React, { Component } from "react";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Home from "./pages/home.js"
import Youtube from "./pages/youtube.js"
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();
// import NowPlaying from "./pages/nowPlaying.js"

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: "Not Checked",
        image: "k",
      }
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }


  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/youtube" component={Youtube} />
            <Route path="/" component={Home} />
            <Link to="/pages/index"></Link>
          </Switch>
        </Router> 
      </div>
    );
  }
}

export default App;
