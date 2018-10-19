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

    componentDidMount() {
        axios.get('/api/scores')
            .then(resp => {
                this.setState({
                    listItems: resp.data
                })
            })
    }

    render() {

        const sortedListItems = this.state.listItems.sort((a, b) => a.time - b.time)


        const mappedListItems = sortedListItems.map((item, i) => {
            return (
                <div className='leaderItem-body' key={i}>
                    {/* <div>{i + 1}</div> */}
                    <LeaderItem item={item} i={i} />
                </div>
            )
        })
        const filteredMappedListItems = mappedListItems.filter((tile, i) => i < 25)


        return (
            <div className='leaderList-body'>
                <div className='leaderList-titles'>
                    <h3>Rank</h3>
                    <h3 id="leaderList-user">User</h3>
                    <h3 id='leaderList-timeScore'>Time Score</h3>
                    <h3>Points</h3>
                </div>
                {filteredMappedListItems}
            </div>
        )
    }
}

export default LeaderList;