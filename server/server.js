// // // ** IMPORTS ** // // //
    
    // Dependencies //
require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

    // Controllers //
const con = require('./controller');
const ac = require('./authController');



// // // ** DECLARATIONS ** // // //

    // General //
const app = express();
const {
    SERVER_PORT,
    SECRET,
    CONNECTION_STRING,
} = process.env;

    // Database Connection //
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Connected to Database');
})



// // // ** Middleware ** // // //
app.use(express.static(`${__dirname}/../build`));
app.use(express.json())
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
}))



// // // ** ENDPOINTS ** // // //

//  // User Data //
    
    // * get
app.get(`/api/user`,con.getUser);

    // * put (updates username and icon)
app.put(`/api/user`, con.updateUsername);

    // * delete
app.delete(`/api/user`, con.deleteUser);


//  // Scores //

    // * get
app.get(`/api/scores`, con.getScores);

    // * post
app.post(`/api/scores`, con.addScore);

    // * put?
app.put(`/api/scores`, con.updateScore);

    // * delete?
app.delete(`/api/scores`, con.deleteScore);


//  // Assets //

    // * get
app.get(`/api/assets`, con.getAssets);




//  // Authentication //

app.get('/auth/callback', ac.login);












// // // ** Please Leave Me Alone!!! ** // // //

app.listen(SERVER_PORT, ()=>{
    console.log(`I can hear if you speaking softly through port ${SERVER_PORT}`);
})