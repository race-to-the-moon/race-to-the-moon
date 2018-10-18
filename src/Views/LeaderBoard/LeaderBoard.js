import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LeaderBoard.css'
import axios from 'axios';
import { connect } from 'react-redux';

// Action Creators //
import { updateTopLvlObj } from '../../ducks/reducer';


import LeaderList from './../../Component/LeaderList/LeaderList'

class LeaderBoard extends Component {
    componentDidMount() {
        if (!this.props.user.user_id) {
            axios.get(`/auth/user`)
                .then(resp => {
                    console.log(resp.data);

                    this.props.updateTopLvlObj({
                        what: 'user',
                        val: resp.data
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }


    render() {
        const { user_id } = this.props.user
        return (
            <div>
                {user_id?(

            <div>
                <div className='leaderBoard-body'>
                    <h1 className="leader-title">LeaderBoard</h1>
                    <div className='leaderList-body'>
                        <LeaderList/>
                    </div>
                    <Link to='/mainmenu'><button>Go To Main Menu</button></Link>
                </div>
                {}
            </div>
                ):(
                    <h1>Please Stop trying to access this without signing in</h1>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;

    return {
        user
    }
}

const mapDispatchToProps = {
    updateTopLvlObj
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard)
