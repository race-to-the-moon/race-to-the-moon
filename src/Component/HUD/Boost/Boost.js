import React from 'react'
import { connect } from 'react-redux'
import './Boost.css'

import { updateValInObj } from '../../../ducks/reducer';

function Boost(props) {
    const { boostAmt, updateValInObj } = props;

    let reduxValInObj = (topLvl, what, val = 'nothing') => {
        updateValInObj({ topLvl, what, val })
    }


    const boosting = (boostAmt) => {
        if (boostAmt === 100) {
            reduxValInObj('rocket', 'boost', true)
            reduxValInObj('rocket', 'hit', false)
            reduxValInObj('rocket', 'invincible', true)
            const updatingBoost = () => {
                if (boostAmt === 0) {
                    reduxValInObj('rocket', 'boost', false)
                    reduxValInObj('rocket', 'invincible', false)
                    return;
                }
                setTimeout(() => {
                    reduxValInObj('rocket', 'boostAmt')
                    reduxValInObj('rocket', 'hit', false)
                    boostAmt -= .25
                    return updatingBoost()
                }, 12.5)
            }
            updatingBoost()
        }
    }

    function handler(event) {
        alert(`
            key: ${event.key}
            keyCode: ${event.keyCode}
            altKey: ${event.altKey}
            ctrlKey: ${event.ctrlKey}
            metaKey: ${event.metaKey}
            shiftKey: ${event.shiftKey}
        `)
    }

    const onKeyPress = (shiftKey) => {
        if (shiftKey) {

            boosting(boostAmt);
        }

    }

    return (
        <div className='boost-container'>
            <div className='boost-meter-container'>
                <p>BOOST</p>
                <div
                    onClick={() => boosting(boostAmt)}
                    onKeyDown={event => alert(event.shiftKey)}
                    // onKeyDown={handler}
                    onKeyPress={handler}
                    onKeyUp={handler}
                    className={(boostAmt === 100 ? 'boost-button' : 'boost-meter')}
                    style={{ "width": boostAmt + '%' }}>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { rocket: { boostAmt } } = state

    return {
        boostAmt
    }
}

const mapDispatchToProps = {
    updateValInObj
}

export default connect(mapStateToProps, mapDispatchToProps)(Boost);

//with a space