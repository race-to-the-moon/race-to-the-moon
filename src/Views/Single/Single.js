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
    rocket = '';
    asteroid = '';
    meteorite = '';

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
            physics: {
                default: 'arcade', 
                arcade: {
                    gravity: { x: 50, y: 200 },
                    debug: true
                }
            },
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
        this.load.image('rocket', 'assets/rocket.png')
        this.load.image('asteroid', 'assets/asteroid.png')
        this.load.image('meteorite', 'assets/meteorite.png')
    }
    
    create() {
        this.bg = this.add.tileSprite(0, 0, this.game.config.width * 2, this.game.config.height * 2, 'background');
        
        this.rocket = this.physics.add.image(this.game.config.width / 2, (this.game.config.height / 2) + 170, 'rocket');
        this.rocket.setDisplaySize( 150, 150 );
        this.rocket.body.allowGravity = false;
        this.rocket.body.immovable = true;
        
        this.asteroid = this.physics.add.image(0, -25, 'asteroid');
        this.asteroid.setDisplaySize( 50, 50 );
        this.asteroid.setVelocity(100, 200);
        this.asteroid.setBounce(1, 1);
        
        this.meteorite = this.physics.add.image(200, -25, 'meteorite');
        this.meteorite.setDisplaySize( 50, 50 );
        this.meteorite.setVelocity(0, 200);
        this.meteorite.setBounce(1,1)

        console.log(this)
        console.log(this.physics)
        console.log(this.asteroid)
        console.log(this.game)
    }
    
    update() {
        this.bg.tilePositionY -= 3;
        this.physics.add.overlap(this.rocket, this.asteroid, this.collisionHandler)
        this.physics.add.collider(this.rocket, this.meteorite)
        this.physics.add.collider(this.asteroid, this.meteorite)
    }

    collisionHandler () {
        this.asteroid.destroy();
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