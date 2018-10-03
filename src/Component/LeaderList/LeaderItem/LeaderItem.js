import React from 'react';
import './LeaderItem.css'

export default function LeaderItem(props){
    const {item} = props
    return (
        <div className='leaderItem'>
            <img src={item.icon} alt='' />
            <div>{item.username}</div>
            <div>{item.time}</div>
            <div>{item.points}</div>
        </div>
    )
}