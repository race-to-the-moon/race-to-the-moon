import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LeaderBoard.css'

import LeaderList from './../../Component/LeaderList/LeaderList'

class LeaderBoard extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div>
                <div className='leaderBoard-body'>
                    <h1>LeaderBoard</h1>
                    <div className='leaderList-body'>
                        <LeaderList/>
                    </div>
                    <Link to='/mainmenu'><button>Go To Main Menu</button></Link>
                </div>
                {}
            </div>
        )
    }
}

export default LeaderBoard;
