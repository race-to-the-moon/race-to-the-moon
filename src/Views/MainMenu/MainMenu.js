import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './MainMenu.css'
import { connect } from 'react-redux';
import axios from 'axios';

// Action Creators //
import { updateTopLvlObj } from '../../ducks/reducer'

class MainMenu extends Component {
    constructor() {
        super();

        this.state = {

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

    render() {

        const { user } = this.props;


        return (
            <div>

                {user.user_id ? (
                    <div className='mainMenu-body'>

                        <h1 id='main-title'>Race To The Moon</h1>
                        <div className='main-buttons-container'>
                            <button>Customize Ship</button>
                            <Link to='/single'><button>Single Player</button></Link>
                            <button>Versus</button>
                            <Link to='/leaderboard'><button>Leader Board</button></Link>
                            <button>Logout</button>
                        </div>
                        <div className='option-buttons-container'>
                            <button>'Sound Icon'</button>
                            <button>Settings Icon</button>
                        </div>
                    </div>
                ) : (
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

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
