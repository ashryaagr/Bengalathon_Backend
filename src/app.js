const express = require("express");
require('./db/mongoose');
const auth_router = require("./routers/auth");
const main_router = require("./routers/main");
const object_router = require('./routers/object');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('./passport');
const googleAssistant = require('../assistant/main');


const app = express();

app.use(passport.initialize()) ;

// Next 5 lines help in parsing input and getting req.body
app.use(bodyParser.urlencoded({ extended: false })) ;
// parse application/json
app.use(bodyParser.json()) ;
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })) ;

app.use(cookieParser());

app.use(auth_router);
app.use(main_router);
app.use(object_router);
app.post('/assistant', googleAssistant);


module.exports = app;