import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import TypingIndicator from './TypingIndicator';
import WhosOnlineList from './WhosOnlineList';
require('dotenv').config();
class ChatScreen extends Component {
    constructor(){
        super()
        this.state={
            messages:[],
            currentRoom:{},
            currentUser:{},
            usersWhoAreTyping:[]

        }
        this.sendMessage=this.sendMessage.bind(this);
        this.sendTypingEvent=this.sendTypingEvent.bind(this);
    }
    componentDidMount(){
        const chatManager = new Chatkit.ChatManager({
            instanceLocator:'v1:us1:06cba65e-4d99-4c8c-aa22-16a92f8d32ee',
            userId:this.props.currentUsername,
            tokenProvider:new Chatkit.TokenProvider({
                url:'http://localhost:5000/authenticate'
            }),
        })
        chatManager
            .connect()
            .then(currentUser => {
                this.setState({currentUser})
                return currentUser.subscribeToRoom({
                    roomId:19410746,
                    messageLimit:100,
                    hooks:{
                        onNewMessage:message=>{
                            this.setState({
                                messages:[...this.state.messages,message]
                            })
                        },
                        onUserStartedTyping :user=>{
                            this.setState({
                                usersWhoAreTyping:[...this.state.usersWhoAreTyping,user.name]
                            })
                        },
                        onUserStoppedTyping: user =>{
                            this.setState({
                                usersWhoAreTyping:this.state.usersWhoAreTyping.filter(
                                    username=>username!== user.name
                                ),
                            })
                        },
                        onUserCameOnline : ()=>this.forceUpdate(),
                        onUserWentOffline : ()=>this.forceUpdate(),
                        onUserJoined : ()=>this.forceUpdate()
                    }
                })
            })
            .then(currentRoom=>{
                this.setState({currentRoom})
            })
            .catch(err =>console.log)
        }
        sendMessage(text){
            this.state.currentUser.sendMessage({
                roomId:this.state.currentRoom.id,
                text
            })
        }
        sendTypingEvent(){
            this.state.currentUser
                .isTypingIn({roomId:this.state.currentRoom.id})
                .catch(error=>console.error("error",error));
        }
    render() {
            const styles = {
                  container: {
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                  },
                  chatContainer: {
                    display: 'flex',
                    flex: 1,
                  },
                  whosOnlineListContainer: {
                    width: '300px',
                    flex: 'none',
                    padding: 20,
                    backgroundColor: '#2c303b',
                    color: 'white',
                  },
                  chatListContainer: {
                    padding: 20,
                    width: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                  },
               }
               return (
                <div style={styles.container}>
                  <header style={styles.header}>
                    <h2>Chatly</h2>
                  </header>
                  <div style={styles.chatContainer}>
                    <aside style={styles.whosOnlineListContainer}>
                     <h2>Who's online PLACEHOLDER</h2>
                      <WhosOnlineList
                        currentUser={this.state.currentUser}
                       users={this.state.currentRoom.users}
                      />
                    </aside>
                    <section style={styles.chatListContainer}>
                      <MessageList
                        messages={this.state.messages}
                        style={styles.chatList}
                      />
                      <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                      <SendMessageForm
                        onSubmit={this.sendMessage}
                        onChange={this.sendTypingEvent}
                      />
                    </section>
                  </div>
                </div>
              )
    }
}

export default ChatScreen;