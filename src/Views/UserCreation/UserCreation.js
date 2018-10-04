import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

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
                {user_id ? (
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