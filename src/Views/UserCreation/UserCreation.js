import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UserCreation extends Component {
    constructor() {
        super();

        this.state = {
            userInput: '',
            filledOut: false,
            started: false,
        }
    }

    updateUsername(val) {
        let filled = val ? true : false;

        this.setState((prevState) => {
            return {
                userInput: val,
                filledOut: filled,
            }
        })
    }

    submitUsername = () => {
        if (this.state.userInput) {

            let userUpdate = {
                username: this.state.userInput
            }
            console.log(userUpdate.username);
            
            axios.put('/api/user', userUpdate)
                .then(resp => {
                    console.log(resp.data);

                })
        } else {
            console.log('nope, please fill out things');
            
        }
    }

    render() {

        const { filledOut } = this.state

        let redirect = filledOut ? '/mainmenu' : '/usercreation';

        return (
            <div>
                <h1>User Creation</h1>
                <h3>Please add a Username</h3>
                <input type="text"
                    placeholder='Username'
                    onChange={(e) => this.updateUsername(e.target.value)}
                />
                <Link to={redirect}>
                    <button
                        onClick={this.submitUsername}
                    >Create User</button></Link>
            </div>
        )
    }
}