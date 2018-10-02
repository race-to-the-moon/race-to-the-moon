import React, { Component } from 'react';


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
                    <button>Single Player</button>
                    <button>Score board</button>
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