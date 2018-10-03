import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class LeaderBoard extends Component {
    
    render() {
        return (
            <div>
                <div>
                    <h1>LeaderBoards</h1>
                    <Link to='/mainmenu'><button>Go To Main Menu</button></Link>
                </div>
                {}
            </div>
        )
    }
}

export default LeaderBoard;
