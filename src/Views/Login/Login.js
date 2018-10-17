import React from 'react';
import './Login.css';
import Moon from '../../srcAssets/Login_moon.png'
import ReactAudioPlayer from 'react-audio-player'
import vo from './../../srcAssets/sound/vo/login-vo.mp3'
export default function Login() {

    let login = () => {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env
        let url = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email%20&redirect_uri=${url}&response_type=code`


    }

    return (
        <div className="whole-login">
        <ReactAudioPlayer volume={1.0} src={vo} autoPlay/>
            <link href="https://fonts.googleapis.com/css?family=Russo+One" rel="stylesheet"></link>
            <div className="box-effects">
                <h2 className="welcome-to">Welcome to</h2>
                <h1 className="rttm">Race to the moon!</h1>
                <button className="login-button" onClick={login}>Please Login</button>
            </div>
            <div className="login-moon-div">
                <img className="login-moon-image" src={Moon} alt="Login_moon"/>
            </div>
        </div>
    )
}