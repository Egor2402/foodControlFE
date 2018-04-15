import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './shared/Nav';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Calendar from './pages/Calendar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Route exact path='/' component={Home}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/calendar' component={Calendar}/>
      </div>
    );
  }
}

export default App;
