import React from 'react';
import { connect } from 'react-redux';
import Moon from '../../../srcAssets/moon.png';
import Rocket from '../../../srcAssets/startup.png';
import './Progress.css';
import { updateValInObj, updateTopLvlObj } from '../../../ducks/reducer';



function ProgressBar(props) {


    var { rocket: {
        timeRemaining,
        totalTime
    },
        gameOn,
        updateTopLvlObj,
        updateValInObj
    } = props;
    var height = (1 - (timeRemaining / totalTime)) * 100;

    // TIME FUNCTION

    function move() {
        var id = setInterval(frame, 500);


        function frame() {
            if (!timeRemaining) {
                console.log('we are in frame if statement', height)

                clearInterval(id);
                updateTopLvlObj({ what: 'gameOn', val: false })
            } else {
                updateValInObj({ topLvl: 'rocket', what: 'timeRemaining', val: 'countDown' })
            }
        }
    }
    if (gameOn && timeRemaining === totalTime) {
        move()
    }


    return (
        <div>
            <div className="progress-bar">
                <div className="moon-div">
                    <img className="moon-icon" src={Moon} />
                </div>
                <div className="rocket-div"
                    style={{ height: height + "%" }}
                    onClick={move}>
                    <img
                        className={props.rocket.hit ? "hit" : "rocket-icon"}
                        src={Rocket} />
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { rocket, gameOn } = state
    return {
        rocket,
        gameOn
    }
}

const mapDispatchToProps = {
    updateValInObj,
    updateTopLvlObj
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);