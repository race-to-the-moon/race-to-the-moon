import React from 'react';

export default function Login(){

    let login=() => {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env
        let url = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email%20&redirect_uri=${url}&response_type=code`


    }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={login}>Login</button>
        </div>
    )
}