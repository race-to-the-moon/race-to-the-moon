import React from 'react';
import './LeaderItem.css'

export default function LeaderItem(props) {
    const { item, i } = props

    const finalScore = ((Math.pow((1 - (Math.floor(item.time) / 120000)),1.2)) * 25000)

    return (
        <div className='leaderItem'>
            <div id='leaderItem-rank'>{i + 1}</div>
            <img src={item.icon} alt='' />
            <div id='leaderItem-user'>{item.username}</div>
            <div id='leaderItem-score'>{Math.floor(finalScore)}</div>
            <div id='leaderItem-points'>{item.points}</div>
        </div>
    )
}