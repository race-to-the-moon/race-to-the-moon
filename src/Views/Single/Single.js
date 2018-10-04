import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Background from './../../Component/Background/Background'

// Action Creators //
import { updateTopLvlObj } from '../../ducks/reducer';

class Single extends Component {
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

    render() {
        const {user_id} =this.props.user
        return (
            <div>
                {user_id?(

            <div>
                <h1>Single Player</h1>
                <Background/>
                <Link to='/mainmenu'><button>Go To Main Menu</button></Link>
            </div>
                ):(
                    <h1>Please Login</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Single)