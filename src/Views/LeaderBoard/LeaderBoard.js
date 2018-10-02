import React from 'react';
import {Link} from 'react-router-dom'

export default function Login(){
    return (
        <div>
            <h1>Leader Board</h1>
            <Link to='/mainmenu'><button>Go To Main Menu</button></Link>
        </div>
    )
}