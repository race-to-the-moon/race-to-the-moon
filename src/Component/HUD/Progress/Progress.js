
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moon from '../../../srcAssets/moon.png';
import Rocket from '../../../srcAssets/startup.png';
import './Progress.css';
import { updateValInObj, updateTopLvlObj } from '../../../ducks/reducer';


class ProgressBar extends Component {
    constructor(props) {
        super()
        

    }


    // // // TIME FUNCTION // // //

    callingAgain = () => {

        const playMe = () => {

            if (this.props.gameOn) {
                this.props.updateValInObj({ topLvl: 'rocket', what: 'timeRemaining', val: 'countDown' })
                this.callingAgain()
            } else {
                clearTimeout(timer)
            }
            clearTimeout(timer)
        }

        let timer = setTimeout(playMe, 500)
    }

    
    render() {
        var { rocket: {
            timeRemaining,
            totalTime,
            hit
        },
            startTime,
        } = this.props;
        var height = (1 - (timeRemaining / totalTime)) * 100;

        if (startTime && timeRemaining === totalTime) {
            this.callingAgain()
        }

        return (
            <div>
                <div className="progress-bar">
                    <div className="moon-div">
                    </div>
                    <div className="rocket-div"
                        style={{ height: height + "%" }}
                    >
                        <img
                            className={hit ? "hit" : "rocket-icon"}
                            src={Rocket} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { rocket, gameOn, startTime } = state
    return {
        rocket,
        gameOn,
        startTime,

    }
}

const mapDispatchToProps = {
    updateValInObj,
    updateTopLvlObj
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
