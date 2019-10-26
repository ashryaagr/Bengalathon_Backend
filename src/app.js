const express = require("express");
const auth_router = require("./routers/auth");
const main_router = require("./routers/main");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('./passport');

const app = express();

app.use(bodyParser);
app.use(cookieParser());
app.use(passport);

app.use(auth_router);
app.use(main_router);

module.exports = app;