import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './UserCreation.css';

// Action Creators //
import { updateTopLvlObj } from '../../ducks/reducer';

class UserCreation extends Component {
    constructor() {
        super();

        this.state = {
            userInput: '',
            filledOut: false,
            started: false,
        }
    }

    componentDidMount() {
        if (!this.props.user.user_id) {
            axios.get(`/auth/user`)
                .then(resp => {
                    console.log(resp.data);

                    this.props.updateTopLvlObj({
                        what: 'user',
                        val: resp.data
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    validateInputLength = (userInput) => {
        userInput > 40 ? userInput.substring(0,39) : userInput;
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
        const { user_id } = this.props.user
        const { filledOut } = this.state

        let redirect = filledOut ? '/mainmenu' : '/usercreation';

        return (
            <div>
                <link href="https://fonts.googleapis.com/css?family=Russo+One" rel="stylesheet"></link>
                {user_id ? (
                    <div className="whole-creation-div">
                        <div className="div-around-htags">
                            <h1 className="user-creation">User Creation</h1>
                            <h3 className="add-username">Please add a Username</h3>
                        </div>
                        <input className="input-box" type="text"
                            placeholder='Username'
                            onChange={(e) => this.updateUsername(e.target.value)}
                        />
                        <Link to={redirect}>
                            <button className="create-user-button"
                                onClick={this.submitUsername}
                            >Create User</button></Link>
                    </div>
                ) : (
                        <h1>Please Sign in</h1>
                    )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;

    return {
        user
    }
}

const mapDispatchToProps = {
    updateTopLvlObj
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCreation)