require('dotenv').config();
const axios = require('axios');


const {
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    // REACT_APP_LOGOUT_REDIRECT,
    // AUTH_REDIRECT,
} = process.env;



module.exports = {
    login: async (req, res) => {
        const payload = {
            client_id: REACT_APP_CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: AUTH_REDIRECT
        }

        // trade code for token 
        let resWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);

        // use token for user info 
        let resWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${resWithToken.data.access_token}`);

        let {
            email,
            name,
            picture,
            sub,
        } = resWithUserData.data;

        let db = req.app.get('db')

        // looking if user already exist
        let foundUser = await db.find_user([sub])


        if (foundUser[0]) {
            // if user exists set user to sessions
            req.session.user = foundUser[0];
            res.redirect('/#/user/dashboard')
        } else {
            // create new user with info from 
            let createdUser = await db.create_user(name, email, picture, sub, admin)
            req.session.user = createdUser[0];
            res.redirect('/#/user/dashboard')
        }
        console.log(req.session)
    },
    userData: (req, res) => {
        // checking if user is signed in
        if (req.session.user) {
            res.status(200).send(req.session.user)
            console.log(req.session);

        } else {
            res.status(401).send('nope! try signing in...');
        }
    },
    logout: (req, res) => {
        // wipes the session for user
        req.session.destroy()
        res.redirect(REACT_APP_LOGOUT_REDIRECT)
    }
}