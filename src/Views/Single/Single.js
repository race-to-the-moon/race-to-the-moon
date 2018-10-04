import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Phaser from 'phaser';

// Action Creators //
import { updateTopLvlObj } from '../../ducks/reducer';

class Single extends Component {

    //varriables
    game = {};
    bg = '';

    componentDidMount() {
        if (!this.props.user.user_id) {
            axios.get(`/auth/user`)
                .then(resp => {
                    console.log(resp.data);

                    this.props.updateTopLvlObj({
                        what: 'user',
                        val: resp.data
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        // Phaser game initiation
        const renderOptions = {
            width: 375,
            height: 667,
            renderer: Phaser.AUTO,
            parent: 'render-game',
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        }
        this.game = new Phaser.Game(renderOptions)
    }

    preload() {
        this.load.image('background', 'https://examples.phaser.io/assets/games/invaders/starfield.png')
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, this.game.config.width * 2, this.game.config.height * 2, 'background');
        console.log(this.game)
    }

    update() {
        this.bg.tilePositionY -= 5;
    }

    render() {
        const { user_id } = this.props.user
        return (
            <div>
                {user_id ? (

                    <div>
                        <h1>Single Player</h1>
                        <div id='render-game' />
                        <Link to='/mainmenu'><button>Go To Main Menu</button></Link>
                    </div>
                ) : (
                        <h1>Please Login</h1>
                    )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;

    return {
        user
    }
}

const mapDispatchToProps = {
    updateTopLvlObj
}

export default connect(mapStateToProps, mapDispatchToProps)(Single)