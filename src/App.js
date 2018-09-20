import React, { Component } from 'react';
// src/App.js

//import React from 'react';
import {withRouter} from 'react-router';
import {Route} from 'react-router-dom';
import Callback from './Callback/Callback';
import './App.css';

import logo from './logo.svg';
import './App.css';

function HomePage (props) {
  console.log(props)
  const authenticated  = props.authenticated;
  console.log("authenticated -- > ",authenticated)

  const logout = () => {
    props.auth.logout();
    props.history.push('/');
  }

  if(authenticated) {
    const name = props.auth.getProfile();
    return (
      <div>
        <h1>Howdy! Glad to see you back, {name.family_name}.</h1>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return (
    <div>
      <h1>I don't know you. Please, log in.</h1>
      <button onClick={props.auth.login}>Log in</button>
    </div>
  );

 }

 function App(props) {
  const authenticated = props.auth.isAuthenticated();

  return (
    <div className="App">
      <Route exact path='/callback' render={() => (
        <Callback auth={props.auth}/>
      )}/>
      <Route exact path='/' render={() => (
        <HomePage
          authenticated={authenticated}
          auth={props.auth}
          history={props.history}
        />)
      }/>
    </div>
  );
}

export default withRouter(App);
/* class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
} */

