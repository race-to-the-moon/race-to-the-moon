import React from 'react'
import {connect} from 'react-redux'
import './Boost.css'

function Boost(props){
    const {boostAmt} = props

    const boosting = (boostAmt) => {
        if(boostAmt === 100){
        console.log('boosting')
        }
    }

    return(
        <div className='boost-container'>
            <div className='boost-meter-container'>
                <div onClick={() => boosting(boostAmt)} 
                        className={(boostAmt === 100 ? 'boost-button' : 'boost-meter')} style={{"width": boostAmt + '%'}}>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {rocket: {boostAmt}} = state

    return {
        boostAmt
    }
}

export default connect(mapStateToProps)(Boost);