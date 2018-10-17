import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './MainMenu.css'
import { connect } from 'react-redux';
import axios from 'axios';
import SettingIcon from '../../srcAssets/settings.icon.png';
import SoundIcon from '../../srcAssets/Sound-Icon.png';

// Action Creators //
import { updateTopLvlObj, resetRedux } from '../../ducks/reducer';

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
        this.props.resetRedux()
    }

    render() {

        const { user } = this.props;

        return (
            <div>
                <link href="https://fonts.googleapis.com/css?family=Russo+One" rel="stylesheet"></link>
                {user.user_id ? (
                    <div className='mainMenu-body'>

                        <h1 id='main-title'>Race To The Moon</h1>
                        <div className='main-buttons-container'>
                            <Link to='/comingsoon'><button>Customize Ship</button></Link>
                            <Link to='/single'><button>Single Player</button></Link>
                            <Link to='/comingsoon'><button>Versus</button></Link>
                            <Link to='/leaderboard'><button>Leader Board</button></Link>

                            <a href='http://localhost:3535/auth/logout'><button>Logout</button></a>
                        </div>
                        <div className='option-buttons-container'>
                            <Link to=""><img className="sound-icon" src={SoundIcon} alt='Sound-Icon.png' /></Link>
                            <Link to=""><img className="setting-icon" src={SettingIcon} alt='setting.icon.png' /></Link>
                        </div>
                    </div>
                ) : (
                    <h1>Please Login</h1>
                    )}
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
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
    updateTopLvlObj,
    resetRedux
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
