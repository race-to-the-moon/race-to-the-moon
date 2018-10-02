import React from 'react';
import {Link} from 'react-router-dom'

export default function MainMenu(){
    return (
        <div>
            <h1>Main Menu</h1>
            <Link to='/leaderboard'><button>Leader Board</button></Link>
            <Link to='/single'><button>Sinlge Player</button></Link>
        </div>
    )
}