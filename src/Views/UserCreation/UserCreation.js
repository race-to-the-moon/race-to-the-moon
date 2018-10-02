import React from 'react';
import {Link} from 'react-router-dom'

export default function UserCreation(){
    return (
        <div>
            <h1>User Creation</h1>
            <Link to='/mainmenu'><button>Create User</button></Link>
        </div>
    )
}