import React from 'react';
import { connect } from 'react-redux';


function Score(props) {

    return (
        <div>
            {props.score.astScore}
        </div>
    )
}

function mapStateToProps(state) {
    const {score} = state
    return {
        score
    }
}

export default connect(mapStateToProps)(Score);