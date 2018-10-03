import React, { Component } from 'react';
import axios from 'axios'
import './LeaderList.css'

import LeaderItem from './LeaderItem/LeaderItem'

class LeaderList extends Component {

    constructor() {
        super()

        this.state = {
            listItems: []
        }
    }

    componentDidMount(){
        axios.get('/api/scores')
        .then(resp => {
            this.setState({
                listItems: resp.data
            })
        })
    }

    render() {
        const mappedListItems = this.state.listItems.map((item, i) => {
            return (
                <div className='leaderItem-body' key={i}>
                    <div>{i + 1}</div>
                    <LeaderItem item={item}/>
                </div>
            )
        })
        return (
            <div className='leaderList-body'>
                {mappedListItems}
            </div>
        )
    }
}

export default LeaderList;