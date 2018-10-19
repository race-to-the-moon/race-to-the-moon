import React from 'react';
import './Loser.css';
import {Link} from 'react-router-dom';

export default function Loser() {

    let insults = ["Yikes... That was horrible. Do better.", "What a sad display of a human being.", "Your skill level is garbage."]

    let insult = insults[Math.floor(Math.random() * insults.length)]
    
    return (
        <div className='loser-body'>
            <h1 className='insult'>{insult}</h1>
            <div className='loser-buttons'>
                <button onClick={() => window.location.reload()}>Try Again</button>
                <Link to='leaderboard'><button>Leaderboard</button></Link>
                <Link to='mainmenu'><button>Main Menu</button></Link>
            </div>
        </div>
    )
}