import React, { Component } from 'react';
import './CountDown.css';

export default class CountDown extends Component {
    constructor() {
        super()

        this.state = {
            countDown: 3
        }
    }
    render() {
        const {countDown} = this.state
        setTimeout(() => { this.setState({ countDown: countDown - 1 }) }, 1000)

        return (
            <div className='counter-container'>
                <p className="counter">
                    {countDown ? countDown
                        :
                        'Go!'}
                </p>
            </div>
        )
    }
}
