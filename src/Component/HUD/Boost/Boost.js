import React from 'react'
import { connect } from 'react-redux'
import './Boost.css'

import { updateValInObj } from '../../../ducks/reducer';

function Boost(props) {
    const { boostAmt, updateValInObj} = props;

    let reduxValInObj = (topLvl, what, val = 'nothing') => {
        updateValInObj({ topLvl, what, val })
    }

    //The base case never gets hit because boostAmt is not updating from redux

    const boosting = (boostAmt) => {
        if (boostAmt === 100) {
            reduxValInObj('rocket', 'boost', true)
            const updatingBoost = () => {
                if (boostAmt === 0) {
                    reduxValInObj('rocket', 'boost', false)
                    return;
                }
                setTimeout(() => {
                    reduxValInObj('rocket', 'boostAmt')
                    boostAmt -= .25
                    return updatingBoost()
                }, 12.5)
            }
            updatingBoost()
        }
    }

    return (
        <div className='boost-container'>
            <div className='boost-meter-container'>
                <div onClick={() => boosting(boostAmt)}
                    className={(boostAmt === 100 ? 'boost-button' : 'boost-meter')} style={{ "width": boostAmt + '%' }}>
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