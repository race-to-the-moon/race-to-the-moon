import React from 'react'
import {connect} from 'react-redux'
import './HealthBar.css'

function HealthBar(props){
    const {health} = props
    return(
        <div className='health-container'>
            <div className='health-meter-container'>
                <div className='health-meter' style={{"height": health + '%'}}></div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {rocket: {health}} = state

    return {
        health
    }
}

export default connect(mapStateToProps)(HealthBar);