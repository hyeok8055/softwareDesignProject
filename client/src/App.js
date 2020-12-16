import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import MainPage from './components/views/MainPage/MainPage'
import MartPage from './components/views/AdminPage/MartPage'
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component ={Auth(LandingPage, null)} /> //hoc가 감싼 형태
          <Route exact path="/login" component = {Auth(LoginPage,false)} />
          <Route exact path="/register" component = {Auth(RegisterPage,false)}/>
          <Route exact path="/main" component = {Auth(MainPage,true)}/>
          <Route exact path="/mart" component = {Auth(MartPage,null)}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

