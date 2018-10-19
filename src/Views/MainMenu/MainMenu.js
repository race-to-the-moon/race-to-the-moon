import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './MainMenu.css'
import { connect } from 'react-redux';
import axios from 'axios';
import SettingIcon from '../../srcAssets/settings.icon.png';
import SoundIcon from '../../srcAssets/Sound-Icon.png';
import themeSong from './../../srcAssets/sound/soundtrack/race-to-the-moon-theme.mp3'
import ReactAudioPlayer from 'react-audio-player'

// Action Creators //
import { updateTopLvlObj, resetRedux } from '../../ducks/reducer';

class MainMenu extends Component {
    constructor() {
        super();

        this.state = {
            toggleMusic: true
        }

    }

    toggleMusicFn = () => this.setState({toggleMusic: !this.state.toggleMusic})

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

        const songPlay = <ReactAudioPlayer volume={0.30} src={themeSong} autoPlay loop/>

        return (
            <div>
                {this.state.toggleMusic ? songPlay : null}
                <link href="https://fonts.googleapis.com/css?family=Russo+One" rel="stylesheet"></link>
                {user.user_id ? (
                    <div className='mainMenu-body'>

                        <h1 id='main-title'>Race To The Moon</h1>
                        <div className='main-buttons-container'>
                            <Link to='/usercreation'><button>Change Username</button></Link>
                            <Link to='/single'><button>Single Player</button></Link>
                            <Link to='/comingsoon'><button>Versus</button></Link>
                            <Link to='/leaderboard'><button>Leader Board</button></Link>

                            <a href={`${process.env.REACT_APP_LOGOUT}`}><button>Logout</button></a>
                        </div>
                        <div className='option-buttons-container'>
                            <button className='soundToggle-btn' onClick={this.toggleMusicFn}>
                                <img className="sound-icon" src={SoundIcon} alt='Sound-Icon.png' />
                            </button>
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
