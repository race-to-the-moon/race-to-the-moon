import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class MainMenu extends Component {
    constructor() {
        super();

        this.state= {

        }
    }

    render() {
        return (
            <div>
                <h1>Main Menu</h1>
                <div>
                    <Link to='/leaderboard'><button>Leader Board</button></Link>
                    <Link to='/single'><button>Sinlge Player</button></Link>
                    <button>Logout</button>
                </div>
                <div>
                    <button>'Sound Icon'</button>
                    <button>Settings Icon</button>
                </div>
            </div>
        )
    }
}

export default MainMenu;
