import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './MainMenu.css'

class MainMenu extends Component {
    constructor() {
        super();

        this.state= {

        }
    }

    render() {
        return (
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
        )
    }
}

export default MainMenu;
