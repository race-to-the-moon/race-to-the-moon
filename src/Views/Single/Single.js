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
import CountDown from '../../Component/CountDown/CountDown';
import PopUp from '../../Component/PopUp/PopUp';


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



function activateMeteor(meteor) {
    meteor
        .setActive(true)
        .setVisible(true);
}

function addMeteor(group) {
    var meteor = group.get(Phaser.Math.Between(20, 350), Phaser.Math.Between(-64, 0));

    if (!meteor) return; // None free

    activateMeteor(meteor);
}


class Single extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stateHealth: 100,
            timerOn: true
        }

        this.testMethod = this.testMethod.bind(this)
        this.self = this;
    }


    //variables      
    game
    bg
    rocket
    asteroid
    meteor
    asteroidGroup
    meteorGroup
    cannon
    bullet
    baller
    bgSpeed
    cursors
    velocity

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
        // console.log(this.self);
        // let gravity = 200;
        // if(this.props.rocket.boost){
        //     gravity = 400;
        // }

        // Phaser game initiation
        const renderOptions = {
            width: 375,
            height: 667,
            renderer: Phaser.AUTO,
            parent: 'render-game',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true
                }
            },
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            },
            self: this.self,

        }
        setTimeout(() => {
            this.game = new Phaser.Game(renderOptions)
            this.game.compContext = this;
            const { updateTopLvlObj } = this.game.compContext.props;

            let reduxTopLvlObj = (what, val = 'nothing') => {
                updateTopLvlObj({ what, val })
            }

            // reduxTopLvlObj('gameOn', true)
            reduxTopLvlObj('startTime', true)

            this.setState({ timerOn: false })

        }, 4000)

        //adding compContext property on game to save class context from 'this'
        //this allows you to update outside components or in our case redux within a scene which changes 'this' context to the scene itself
        // console.log('game', this.game)
    }

    preload() {
        this.load.image('background', 'https://examples.phaser.io/assets/games/invaders/starfield.png')
        this.load.image('rocket', 'assets/rocket.png')
        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.image('meteorite', 'assets/meteorite.png')
        this.load.image('cannon', 'assets/cannon.png')
        this.load.image('bullet', 'assets/bullet.png')
        // console.log('inside phaser func', this)
    }

    create() {

        this.bg = this.add.tileSprite(0, 0, this.game.config.width * 2, this.game.config.height * 2, 'background');

        this.rocket = this.physics.add.image(this.game.config.width / 2, (this.game.config.height / 2) + 150, 'rocket');
        this.rocket.setDisplaySize(150, 150);
        this.rocket.body.isCircle = true;
        this.rocket.body.setCircle(140, 115, 40)
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
        this.velocity = new Phaser.Math.Vector2();
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
            velocityFromRotation(angle, 1000, this.velocity);
            gfx.clear().strokeLineShape(line);
        }, this);

        this.cursors = this.input.keyboard.createCursorKeys()

        this.input.on('pointerup', () => {
            this.bullet.enableBody(true, this.cannon.x, this.cannon.y, false, true).setVelocity(this.velocity.x, this.velocity.y);
        })

        console.log('input', this.input)

        this.asteroidGroup = this.physics.add.group({
            defaultKey: 'asteroid',
            maxSize: 10,
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
            delay: 400,
            loop: true,
            callback: () => addAsteroid(this.asteroidGroup)
        });

        this.meteorGroup = this.physics.add.group({
            defaultKey: 'meteorite',
            maxSize: 1,
            createCallback: (meteor) => {
                meteor.setName('meteorite');
                console.log('Created', meteor.name);
                meteor.enableBody = true;
            },
            removeCallback: (meteor) => {
                console.log('Removed', meteor.name);
            }
        });

        this.time.addEvent({
            delay: 7000,
            loop: true,
            callback: () => addMeteor(this.meteorGroup)
        });

        // console.log(this)
        console.log('physics', this.physics)
        // console.log('meteorite', this.meteorite)
        console.log('rocket', this.rocket)
        console.log(this.game)
        console.log('asteroid group', this.asteroidGroup)
        // console.log('entries', this.asteroidGroup.children.entries)
        // console.log('deep physics', this.asteroidGroup)
        // console.log('bullet', this.bullet)

    }

    update() {
        const {
            rocket: { health, timeRemaining, boost, hit },
            score: { astScore },
            updateValInObj,
            gameOn,
            updateTopLvlObj
        } = this.game.compContext.props;
        const { stateHealth } = this.game.compContext.state;

        if (this.cursors.space.isDown) {
            this.bullet.enableBody(true, this.cannon.x, this.cannon.y, false, true).setVelocity(this.velocity.x, this.velocity.y);
        }

        if (hit) {
            this.bgSpeed = 1
        } else if (boost) {
            this.bgSpeed = 20
        } else {
            this.bgSpeed = 3
        }

        this.bg.tilePositionY -= this.bgSpeed
        // 
        let reduxValInObj = (topLvl, what, val = 'nothing') => {
            // if(what==='health'){
            //     this.game.compContext.setState({stateHealth: stateHealth-10})
            //     console.log(stateHealth);

            //     val = stateHealth -10
            // }
            updateValInObj({ topLvl, what, val })
        }

        Phaser.Actions.IncY(this.asteroidGroup.getChildren(), 1);

        this.asteroidGroup.children.iterate((asteroid) => {
            if (boost) {
                this.asteroidGroup.setVelocityY(7000)
            } else if (hit) {
                this.asteroidGroup.setVelocityY(50)
            } else {
                this.asteroidGroup.setVelocityY(300)
            }

            if (asteroid.y > 667) {
                this.asteroidGroup.killAndHide(asteroid);
                //may change if too hard ^^^^ to code below.

                // this.asteroidGroup.remove(asteroid.y,true, true)

            }

        });


        Phaser.Actions.IncY(this.meteorGroup.getChildren(), 1);

        this.meteorGroup.children.iterate((meteor) => {
            if (boost) {
                this.meteorGroup.setVelocityY(7000)
            } else {
                this.meteorGroup.setVelocityY(1000)
            }

            if (meteor.y > 667) {
                this.meteorGroup.killAndHide(meteor);
            }

        });


        this.asteroidGroup.children.iterate((asteroid) => {
            this.physics.add.overlap(asteroid, this.rocket, () => {
                this.asteroidGroup.remove(asteroid, true, true)

                // REDUX Section
                // let healthUpdate = health - 10
                if (!health) {
                    reduxValInObj('rocket', 'alive', false)
                }

                reduxValInObj('rocket', 'health')
                reduxValInObj('rocket', 'hit', true)
                reduxValInObj('rocket', 'invincible', true)
                // if(!hit){
                setTimeout(() => {
                    reduxValInObj('rocket', 'hit', false)
                    reduxValInObj('rocket', 'invincible', false)
                }, 3000)
                // }
                // reduxValInObj('rocket','boost', false)
                reduxValInObj('rocket', 'boostAmt', 0)
                reduxValInObj('rocket', 'totalTime')
                reduxValInObj('rocket', 'timeRemaining')
            })
            this.physics.add.overlap(asteroid, this.bullet, () => {
                this.asteroidGroup.remove(asteroid, true, true)
                this.bullet.disableBody(true, true)

                //using the created this.game property to keep context of this to the class so we can update redux
                reduxValInObj('rocket', 'boostAmt')
                reduxValInObj('score', 'astScore')
            })
        });

        this.meteorGroup.children.iterate((meteor) => {
            this.physics.add.overlap(meteor, this.rocket, () => {
                this.meteorGroup.remove(meteor, true, true)

                // REDUX Section
                // let healthUpdate = health - 10
                if (!health) {
                    reduxValInObj('rocket', 'alive', false)
                }

                reduxValInObj('rocket', 'health')
                reduxValInObj('rocket', 'hit', true)
                reduxValInObj('rocket', 'invincible', true)
                // if(!hit){
                setTimeout(() => {
                    reduxValInObj('rocket', 'hit', false)
                    reduxValInObj('rocket', 'invincible', false)
                }, 3000)
                // }
                // reduxValInObj('rocket','boost', false)
                reduxValInObj('rocket', 'boostAmt', 0)
                reduxValInObj('rocket', 'totalTime')
                reduxValInObj('rocket', 'timeRemaining')
            })

            this.physics.add.overlap(meteor, this.bullet, () => {
                this.meteorGroup.remove(meteor, true, true)
                this.bullet.disableBody(true, true)

                //using the created this.game property to keep context of this to the class so we can update redux
                reduxValInObj('rocket', 'boostAmt', 100)
                reduxValInObj('score', 'astScore')
            })
        });

        if (!health || !timeRemaining) {
            updateTopLvlObj({ what: 'gameOn', val: false })
            updateTopLvlObj({what: 'startTime', val: false})
        }

        if (!gameOn) {
            this.sys.game.destroy(true)
        }
    }

    render() {
        const { user_id } = this.props.user
        const { gameOn, startTime } = this.props
        return (
            <div className="single-container">
                {user_id ? (

                    <div className="game-div">
                        <div id='render-game' />
                        <div className='hud-div'>
                            <Score />
                            <ProgressBar stopMe={startTime} />
                            <HealthBar />
                            <Boost />
                        </div>
                        {this.state.timerOn ? <CountDown />
                            : null}
                        {!gameOn ? <PopUp />
                            : null}
                    </div>
                ) : (
                        <h1>Please Login</h1>
                    )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user, score, rocket, gameOn, startTime } = state;

    return {
        user,
        score,
        rocket,
        gameOn,
        startTime,
    }
}

const mapDispatchToProps = {
    updateTopLvlObj,
    updateValInObj
}

export default connect(mapStateToProps, mapDispatchToProps)(Single)
