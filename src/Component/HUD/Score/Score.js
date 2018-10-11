import React from 'react';
import { connect } from 'react-redux';
import './Score.css'

function Score(props) {

    return (
        <div className="score-container">
            <link href="https://fonts.googleapis.com/css?family=Russo+One" rel="stylesheet"></link>
            {props.score.astScore}
        </div>
    )
}

function mapStateToProps(state) {
    const { score } = state
    return {
        score
    }
}

export default connect(mapStateToProps)(Score);