import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Chat from "./components/Chat";
import Join from "./components/Join";
import "./components/style.scss";

class App extends Component {
   state = {
      username: "",
   };
   setUsername = (e, username) => {
      e.preventDefault();
      this.setState({
         [e.target.name]: e.target.value,
      });
   };
   render() {
      return (
         <Switch>
            <Route
               exact
               path="/"
               render={(props) => (
                  <Join {...props} username={this.state.username} setUser={this.setUsername} />
               )}
            />
            <Route
               exact
               path="/chat"
               render={(props) => <Chat {...props} username={this.state.username} />}
            />
         </Switch>
      );
   }
}

export default App;
