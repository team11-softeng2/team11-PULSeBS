import React from 'react';
import API from './API';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    /*
    this.state = {
    };
    */
  }

  componentDidMount() {
    
  }

  render(props) {
    return (
      <Router>
        {/*<TopBar loggedin = {this.state.loggedin} logout={this.logout} ></TopBar>*/}
        <Switch>
          <Route path="/">
            <p>TEST</p>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

