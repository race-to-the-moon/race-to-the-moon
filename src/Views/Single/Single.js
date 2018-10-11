import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Phaser from 'phaser';
import ProgressBar from '../../Component/HUD/Progress/Progress';
import Score from '../../Component/HUD/Score/Score';
import Boost from '../../Component/HUD/Boost/Boost';
import HealthBar from '../../Component/HUD/HB/HealthBar';
import './Single.css';


// Action Creators //
import { updateTopLvlObj, updateValInObj } from '../../ducks/reducer';

function activateAsteroid(asteroid) {
    asteroid
        .setActive(true)
        .setVisible(true);
}

function addAsteroid(group) {
    var asteroid = group.get(Phaser.Math.Between(20, 350), Phaser.Math.Between(-64, 0));

    if (!asteroid) return; // None free

    activateAsteroid(asteroid);
}


class Single extends Component {

    constructor(props) {
        super(props)

        this.state={
            stateHealth: 100
        }

        this.testMethod = this.testMethod.bind(this)
        this.self = this;
    }


    //variables
    game
    bg
    rocket
    asteroid
    meteorite
    asteroidGroup
    cannon
    bullet
    baller

    testMethod(reduxMethodName, data) {
        this.props[reduxMethodName](data)
    }

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
        console.log(this.self);
        let gravity = 200;
        if(this.props.rocket.boost){
            gravity = 400;
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
                    gravity: { y: gravity },
                    debug: true
                }
            },
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update,
                extends: [
                    this.updateRedux
                ]
            },
            self: this.self,

        }
        this.game = new Phaser.Game(renderOptions)

        //adding compContext property on game to save class context from 'this'
        //this allows you to update outside components or in our case redux within a scene which changes 'this' context to the scene itself
        this.game.compContext = this;
        console.log('game', this.game)
    }

    preload() {
        this.load.image('background', 'https://examples.phaser.io/assets/games/invaders/starfield.png')
        this.load.image('rocket', 'assets/rocket.png')
        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.image('meteorite', 'assets/meteorite.png')
        this.load.image('cannon', 'assets/cannon.png')
        this.load.image('bullet', 'assets/bullet.png')
        console.log('inside phaser func', this)
    }

    create() {

        this.bg = this.add.tileSprite(0, 0, this.game.config.width * 2, this.game.config.height * 2, 'background');

        this.rocket = this.physics.add.image(this.game.config.width / 2, (this.game.config.height / 2) + 150, 'rocket');
        this.rocket.setDisplaySize(150, 150);
        this.rocket.body.isCircle = true;
        this.rocket.enableBody = true;
        this.rocket.body.allowGravity = false;
        this.rocket.body.immovable = true;

        this.cannon = this.physics.add.image(this.game.config.width / 2, (this.game.config.height / 2) + 80, 'cannon')
        this.cannon.setDisplaySize(20, 20);
        // this.cannon.anchor(0.5,0.5)
        this.cannon.body.allowGravity = false;
        this.cannon.body.immovable = true;

        let Between = Phaser.Math.Distance.Between;
        let BetweenPoints = Phaser.Math.Angle.BetweenPoints;
        let SetToAngle = Phaser.Geom.Line.SetToAngle;
        let velocity = new Phaser.Math.Vector2();
        let line = new Phaser.Geom.Line();
        let velocityFromRotation = this.physics.velocityFromRotation;
        let gfx = this.add.graphics().setDefaultStyles({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });

        this.bullet = this.physics.add.image(this.cannon.x, this.cannon.y, 'bullet');
        this.bullet.setDisplaySize(40, 40);
        this.bullet.disableBody(true, true);

        this.input.on('pointermove', (pointer) => {
            let angle = BetweenPoints(this.cannon, pointer);

            let distance = Between(this.cannon.x, this.cannon.y, pointer.position.x, pointer.position.y)

            SetToAngle(line, this.cannon.x, this.cannon.y, angle, distance);
            velocityFromRotation(angle, 600, velocity);
            gfx.clear().strokeLineShape(line);
        }, this);

        this.input.on('pointerup', () => {
            console.log('clicked')
            this.bullet.enableBody(true, this.cannon.x, this.cannon.y, false, true).setVelocity(velocity.x, velocity.y);

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
            delay: 800,
            loop: true,
            callback: () => addAsteroid(this.asteroidGroup)
        });

        this.meteorite = this.physics.add.image(200, -25, 'meteorite');
        this.meteorite.setDisplaySize(50, 50);
        this.meteorite.setVelocity(0, 200);
        this.meteorite.setBounce(1, 1)

        // console.log(this)
        // console.log('physics', this.physics)
        // console.log('meteorite', this.meteorite)
        // console.log(this.game)
        // console.log('asteroid group', this.asteroidGroup)
        // console.log('entries', this.asteroidGroup.children.entries)
        // console.log('deep physics', this.asteroidGroup)
        // console.log('bullet', this.bullet)

    }

    update() {
        const {
            rocket: { health, time },
            score: { astScore },
            updateValInObj
        } = this.game.compContext.props;
        const {stateHealth} = this.game.compContext.state;

        this.bg.tilePositionY -= 3;
// 
        let reduxValInObj = (topLvl,what,val='nothing')=>{
            // if(what==='health'){
            //     this.game.compContext.setState({stateHealth: stateHealth-10})
            //     console.log(stateHealth);
                
            //     val = stateHealth -10
            // }
            updateValInObj({ topLvl, what, val})
        }

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
                this.asteroidGroup.remove(asteroid, true, true)
                
                // REDUX Section
                // let healthUpdate = health - 10
                if (!health){
                    reduxValInObj('rocket','alive', false)
                }
                
                reduxValInObj('rocket','health')
                // reduxValInObj('rocket','boost', false)
                reduxValInObj('rocket','boostAmt', 0)
                reduxValInObj('rocket','totalTime')
                reduxValInObj('rocket','timeRemaining')

                
                
            })
            
            
            this.physics.add.overlap(asteroid, this.bullet, () => {
                this.asteroidGroup.remove(asteroid, true, true)
                this.bullet.disableBody(true, true)
                
                //using the created this.game property to keep context of this to the class so we can update redux
                reduxValInObj('rocket','boostAmt')
                reduxValInObj('score','astScore')
            })
        });

        this.physics.add.overlap(this.meteorite, this.rocket, () => {
            this.meteorite.disableBody(true, true)
        });
    }

    render() {
        const { user_id } = this.props.user
        return (
            <div className="single-container">
                {user_id ? (

                    <div className="game-div">
                        <div id='render-game'/>
                        <div className='hud-div'>
                            <Score />
                            <ProgressBar />
                            <HealthBar />
                            <Boost />
                        </div>
                    </div>
                ) : (
                        <h1>Please Login</h1>
                    )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user, score, rocket } = state;

    return {
        user,
        score,
        rocket
    }
}

const mapDispatchToProps = {
    updateTopLvlObj,
    updateValInObj
}

export default connect(mapStateToProps, mapDispatchToProps)(Single)
