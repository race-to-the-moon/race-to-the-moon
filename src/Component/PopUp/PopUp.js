import React, { Component } from 'react';
import { connect } from 'react-redux';
import Winner from './Winner/Winner';
import Loser from './Loser/Loser';


class PopUp extends Component {
    constructor() {
        super();


    }

    render() {
        const { health } = this.props.rocket
        return (
            <div>
                {!health ? (
                    <Loser />
                ) : (
                        <Winner />
                    )}
            </div>
        )
    }
}

const mapStateToProps = ({ rocket }) => {
    return {
        rocket
    }
}

export default connect(mapStateToProps)(PopUp);