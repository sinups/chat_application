import React, { Component } from 'react';
import './App.css';
import UsernameForm from './Components/UsernameForm';
import ChatScreen from './Components/ChatScreen';

class App extends Component {
  constructor(){
    super();
    this.state={
      currentScreen:'WhatIsYourUsernameScreen',
      currentUsername:''
    }
    this.onUsernameSubmitted=this.onUsernameSubmitted.bind(this);
  }
  onUsernameSubmitted (username){
    fetch('http://localhost:5000/users',{
      method:'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify({username})
    }).then(res=>{
        this.setState({
        currentUsername:username,
        currentScreen:'ChatScreen'
      })
    }).catch(err=>{
      console.error(err);
    })
  }
  render() {
    if(this.state.currentScreen==="WhatIsYourUsernameScreen"){
    return (
      <UsernameForm onSubmit={this.onUsernameSubmitted}/>
    );
    }else if(this.state.currentScreen==="ChatScreen"){
      return(
        <ChatScreen currentUsername={this.state.currentUsername}/>
      );
    }
  }
}

export default App;
