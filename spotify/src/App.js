import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/home.js"
import PickPlaylist from "./pages/pickPlaylist.js"
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
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
            <Route path="/pickPlaylist" component={PickPlaylist} />
            <Route path="/" component={Home} />
          </Switch>
        </Router> 
      </div>
    );
  }
}

export default App;
