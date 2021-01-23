import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home.js"
import PickPlaylist from "./pages/pickPlaylist.js"
import Youtube from "./pages/youtube.js"
import Modes from "./pages/modes.js"
<<<<<<< HEAD
import Dynamic from "./pages/dynamic.js"
=======
>>>>>>> 45b26e6091a3257845c1906bae3804d3bb74c5ca
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(props) {
    super(props);
    this.params = this.getHashParams();
    this.state = {
      loggedIn: this.params.access_token ? true : false,
    };
<<<<<<< HEAD
    // If access token is available, store it in local storage to be available at all pages
=======
    // If access token is available, store it in local storage
>>>>>>> 45b26e6091a3257845c1906bae3804d3bb74c5ca
    if (this.params.access_token) {
      spotifyWebApi.setAccessToken(this.params.access_token)
      localStorage.setItem("access_token", this.params.access_token)
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
            <Route path="/modes" component={Modes}/>
            <Route path="/youtube" component={Youtube}/>
<<<<<<< HEAD
            <Route path="/dynamic" component={Dynamic} />
=======
>>>>>>> 45b26e6091a3257845c1906bae3804d3bb74c5ca
            <Route path="/pickPlaylist" component={PickPlaylist}/>
            <Route path="/" component={Home} />
          </Switch>
        </Router> 
      </div>
    );
  }
}

export default App;
