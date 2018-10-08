import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Phaser from 'phaser';

// Action Creators //
import { updateTopLvlObj } from '../../ducks/reducer';

function activateAsteroid (asteroid) {
    asteroid
    .setActive(true)
    .setVisible(true);
}

function addAsteroid (group) {
    var asteroid = group.get(Phaser.Math.Between(20, 350), Phaser.Math.Between(-64, 0));

    if (!asteroid) return; // None free

    activateAsteroid(asteroid);
}

class Single extends Component {

    //varriables
    game
    bg
    rocket
    asteroid
    meteorite
    asteroidGroup
    cannon
    bullet
    
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
                    gravity: {y: 200 },
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
        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.image('meteorite', 'assets/meteorite.png')
        this.load.image('cannon', 'assets/cannon.png')
        this.load.image('bullet', 'assets/bullet.png')
    }
    
    create() {
        this.bg = this.add.tileSprite(0, 0, this.game.config.width * 2, this.game.config.height * 2, 'background');
        
        this.rocket = this.physics.add.image(this.game.config.width / 2, (this.game.config.height / 2) + 170, 'rocket');
        this.rocket.setDisplaySize( 150, 150 );
        this.rocket.body.isCircle = true;
        this.rocket.enableBody = true;
        this.rocket.body.allowGravity = false;
        this.rocket.body.immovable = true;
        
        this.cannon = this.physics.add.image(this.game.config.width / 2, (this.game.config.height / 2) + 95, 'cannon')
        this.cannon.setDisplaySize(20, 20);
        // this.cannon.anchor(0.5,0.5)
        this.cannon.body.allowGravity = false;
        this.cannon.body.immovable = true;
        // this.cannon.rotation = this.physics.
        
        var Between = Phaser.Math.Distance.Between;
        var BetweenPoints = Phaser.Math.Angle.BetweenPoints;
        var SetToAngle = Phaser.Geom.Line.SetToAngle;
        var velocity = new Phaser.Math.Vector2();
        var line = new Phaser.Geom.Line();
        var velocityFromRotation = this.physics.velocityFromRotation;
        var gfx = this.add.graphics().setDefaultStyles({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });

        this.bullet = this.physics.add.image(this.cannon.x, this.cannon.y, 'bullet');
        this.bullet.setDisplaySize(40, 40);
        this.bullet.disableBody(true, true);

        this.input.on('pointermove', (pointer) => {
            var angle = BetweenPoints(this.cannon, pointer);

            let distance = Between(this.cannon.x, this.cannon.y, pointer.position.x, pointer.position.y)

            SetToAngle(line, this.cannon.x, this.cannon.y, angle, distance);
            velocityFromRotation(angle, 600, velocity);
            gfx.clear().strokeLineShape(line);
        }, this);

        this.input.on('pointerup', () => {
            console.log('clicked')
            this.bullet.enableBody(true, this.cannon.x, this.cannon.y, true, true).setVelocity(velocity.x, velocity.y);

        })
        
        this.asteroidGroup = this.physics.add.group({
            defaultKey: 'asteroid',
            maxSize: 300,
            createCallback: (asteroid) => {
                asteroid.setName('asteroid');
                console.log('Created', asteroid.name);
                asteroid.enableBody = true;
            },
            removeCallback: (asteroid) => {
                console.log('Removed', asteroid.name);
            }
        });
    
        this.time.addEvent({
            delay: 700,
            loop: true,
            callback: () => addAsteroid(this.asteroidGroup)
        });

        this.meteorite = this.physics.add.image(200, -25, 'meteorite');
        this.meteorite.setDisplaySize( 50, 50 );
        this.meteorite.setVelocity(0, 200);
        this.meteorite.setBounce(1,1)

        console.log(this)
        console.log('physics', this.physics)
        console.log('meteorite', this.meteorite)
        console.log(this.game)
        console.log('asteroid group', this.asteroidGroup)
        console.log('entries', this.asteroidGroup.children.entries)
        console.log('deep physics', this.asteroidGroup)
        console.log('bullet', this.bullet)

    }
    
    update() {
        
        this.bg.tilePositionY -= 3;

        Phaser.Actions.IncY(this.asteroidGroup.getChildren(), 1);

        this.asteroidGroup.children.iterate((asteroid) => {
            if (asteroid.y > 667) {
                this.asteroidGroup.killAndHide(asteroid);
                //may change if too hard ^^^^ to code below.

                // this.asteroidGroup.remove(asteroid.y,true, true)

            }
        });

        this.asteroidGroup.children.iterate((asteroid) => {
            this.physics.add.overlap(asteroid, this.rocket, () => {
                this.asteroidGroup.remove(asteroid,true, true)
            })
            this.physics.add.overlap(asteroid, this.bullet, () => {
                this.asteroidGroup.remove(asteroid, true, true)
                this.bullet.disableBody(true, true)
            })
        });
        // this.physics.add.overlap(this.asteroidGroup, this.rocket, () => {
        //     // console.log('destroy')
        //     for(let i = 0; i < this.asteroidGroup.children.entries.length ; i++){
        //         this.asteroidGroup.children.entries[i].disableBody(true, true)
        //     }
        // });

        this.physics.add.overlap(this.meteorite, this.rocket, () => {
            // console.log('destroy')
            this.meteorite.disableBody(true, true)
        });

        // this.physics.add.overlap(this.asteroid, this.meteorite, () => {
        //     // console.log('destroy')
        //     this.meteorite.disableBody(true, true)
        //     this.asteroid.disableBody(true, true)
        // }); 
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