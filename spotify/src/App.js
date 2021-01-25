import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home.js"
import PickPlaylist from "./pages/pickPlaylist.js"
import Youtube from "./pages/youtube.js"
import Modes from "./pages/modes.js"
import Dynamic from "./pages/dynamic.js"
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/modes" component={Modes}/>
            <Route path="/youtube" component={Youtube}/>
            <Route path="/dynamic" component={Dynamic} />
            <Route path="/pickPlaylist" component={PickPlaylist}/>
            <Route path="/" component={Home} />
          </Switch>
        </Router> 
      </div>
    );
  }
}

export default App;
