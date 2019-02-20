import React, { Component } from 'react'

export default class UsernameForm extends Component {
    constructor(props){
        super(props)
        this.state={
            username:''
        }
        this.settingUsername=this.settingUsername.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    settingUsername(e){
        this.setState({username:e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        this.props.onSubmit(this.state.username);
    }
    render() {
        return (
        <div>
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="What is your username?" onChange={this.settingUsername} />
                <input type="submit" value="Submit" />
            </form>
        </div>
        )
    }
}
