import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UserCreation extends Component {
    constructor() {
        super();

        this.state = {
            usernameInput = ''
        }
    }

    updateUsername(val) {
        this.setState((prevState) => {
            return { usernameInput: val }
        })
    }

    submitUsername() {
        let userUpdate = {
            username: this.state.usernameInput
        }
        axios.put('/api/user', userUpdate)
            .then(resp => {
                console.log(resp.data);

            })
    }

    render() {

        return (
            <div>
                <h1>User Creation</h1>
                <h3>Please add a Username</h3>
                <input type="text"
                    placeholder='Username'
                    onClick={(e) => this.usernameInput(e.target.value)}
                />
                <Link to='/mainmenu'>
                    <button
                        onClick={this.submitUsername}
                    >Create User</button></Link>
            </div>
        )
    }
}