import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home.js"
import Modes from "./pages/modes.js"
import Dynamic from "./pages/dynamic.js"
import PickPlaylist from "./pages/pickPlaylist.js"
import Youtube from "./pages/youtube.js"



class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/modes" component={Modes}/>
            <Route path="/youtube" component={Youtube}/>
            <Route path="/dynamic" component={Dynamic} />
            <Route path="/playlist" component={PickPlaylist}/>
            <Route path="/" component={Home} />
          </Switch>
        </Router> 
      </div>
    );
  }
}

export default App;
