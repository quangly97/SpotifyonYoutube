import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.js"
import Modes from "./pages/ModesPage/ModesPage"
import Dynamic from "./pages/DynamicPage/DynamicPage"
import PickPlaylist from "./pages/PickPlaylistPage/PickPlaylistPage"
import Youtube from "./pages/PlaylistYoutubePage/PlaylistYoutubePage"
import PrivateRoute from "./util/PrivateRoute"


const App = () => {
  return (
      <div>
        <Router>
          <Switch>
            <Route path="/modes" component={Modes}/>
            <PrivateRoute path="/youtube" component={Youtube}/>
            <PrivateRoute path="/dynamic" component={Dynamic} />
            <PrivateRoute path="/playlist" component={PickPlaylist}/>
            <Route path="/" component={LandingPage} />
          </Switch>
        </Router> 
      </div>
    )
}
 
export default App;
