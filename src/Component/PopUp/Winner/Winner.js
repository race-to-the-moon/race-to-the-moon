import React, { Component } from 'react';
import './Winner.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { updateValInObj } from '../../../ducks/reducer';
import axios from 'axios';



class Winner extends Component {
    constructor() {
        super()


    }

    timeScoreAlg = (finalTime) => {
        // const finalScore = (1 - (finalTime / 120000) * 25000)
        const finalScore = ((Math.pow((1 - (Math.floor(finalTime) / 120000)), 1.2)) * 25000)
    }

    componentDidMount() {
        const { rocket: { timeRemaining, totalTime }, updateValInObj, score: { astScore } } = this.props
        if (timeRemaining === 0) {
            const finalScore = this.timeScoreAlg(totalTime)
            updateValInObj({ topLvl: 'score', what: 'timeScore', val: finalScore })
        }
        axios.post('/api/scores', { totalTime, astScore })
            .then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
    }

    render() {

        var messages = ["Congratulations!", "You made it to the moon!", "Someone is an Armstrong!", "You da Best!"];
        const { astScore } = this.props.score
        const { timeScore } = this.props.score

        return (
            <div className="winning-div">
                <link href="https://fonts.googleapis.com/css?family=Russo+One" rel="stylesheet"></link>
                <div>
                    <h1 className="winning-message">Congratulations!</h1>
                </div>
                <div className="winning-button-container">
                    <Link to="/leaderboard"><button>LeaderBoards</button></Link>
                    <button onClick={() => window.location.reload()}>Restart</button>
                    <Link to="/mainmenu"><button>Main Menu</button></Link>
                </div>
                <h1 className="winning-score">{astScore}</h1>
                <div className="pyro">
                    <div className="before"></div>
                    <div className="after"></div>
                </div>
            </div>
        )

    }
}

const mapStateToProps = ({ score, rocket }) => {
    return {
        score,
        rocket
    }
}

export default connect(mapStateToProps, { updateValInObj })(Winner)