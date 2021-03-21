import React, { Component } from "react";
import ScrollToTop from "./ScrollToTop";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./routes/Home";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount(){
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
