import React from 'react';
import { connect } from 'react-redux';
import Moon from '../../../srcAssets/moon.png';
import Rocket from '../../../srcAssets/startup.png';
import './Progress.css';
import { updateValInObj } from '../../../ducks/reducer';

function ProgressBar(props) {
    var { timeRemaining, totalTime } = props.rocket
    var height = (1 - (timeRemaining / totalTime)) * 100;
    function move() {
        console.log('Im moving', height)
        var id = setInterval(frame, 10);
        function frame() {
            console.log('we are in frame', height)
            if (height >= 50) {
                console.log('we are in frame if statement', height)

                clearInterval(id);
            } else {
                props.updateValInObj({ topLvl: 'rocket', what: 'timeRemaining', val: 'countDown' })
            }
        }
    }
    return (
        <div>
            <div id="progress-bar">
                <div className="moon-div">
                    <img className="moon-icon" src={Moon} />
                </div>
                <div className="rocket-div"
                    style={{ height: height + "%" }}>
                    <img className="rocket-icon" src={Rocket} />
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { rocket } = state
    return {
        rocket
    }
}

export default connect(mapStateToProps, { updateValInObj })(ProgressBar);