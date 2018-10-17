import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Views/Login/Login';
import UserCreation from './Views/UserCreation/UserCreation';
import MainMenu from './Views/MainMenu/MainMenu';
import LeaderBoard from './Views/LeaderBoard/LeaderBoard';
import Single from './Views/Single/Single';
import ComingSoon from './Views/ComingSoon/ComingSoon';

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/usercreation' component={UserCreation} />
        <Route path='/mainmenu' component={MainMenu} />
        <Route path='/leaderboard' component={LeaderBoard} />
        <Route path='/single' component={Single} />
        <Route path='/comingsoon' component={ComingSoon} />
    </Switch>
)