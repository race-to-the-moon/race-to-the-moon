require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');


// // // Declarations // // //
const app = express();
const {
    SERVER_PORT,
    // SECRET,
    CONNECTION_STRING,
} = process.env;

// Database Connection
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Connected to Database');

})


// // // Middleware // // //
app.use(express.static(`${__dirname}/../build`));
app.use(express.json())
















// // // Please Leave Me Alone!!! // // //

app.listen(SERVER_PORT, ()=>{
    console.log(`I can hear if you speaking softly through port ${SERVER_PORT}`);
})