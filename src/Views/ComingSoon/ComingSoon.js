import React, { Component } from 'react';
import './comingsoon.css';
import { Link } from 'react-router-dom';

class ComingSoon extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="div-around-comingsoon">
                <link href="https://fonts.googleapis.com/css?family=Russo+One" rel="stylesheet"></link>
                <h1 className="comingsoon-text">Coming Soon</h1>
                <Link to="/mainmenu"><button className="back-to-mainmenu">Back to Main Menu</button></Link>
            </div>
        )
    }
}

export default ComingSoon;