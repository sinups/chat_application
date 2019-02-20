import React, { Component } from 'react';
import './App.css';
import UsernameForm from './Components/UsernameForm';

class App extends Component {
  render() {
    return (
      <UsernameForm onSubmit={username=>alert(username)}/>
    );
  }
}

export default App;
