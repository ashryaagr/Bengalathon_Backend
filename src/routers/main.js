const express = require('express');
const passport = require('../passport');

const router = new express.Router();

router.post('/', async (req, res)=>{
	res.send("Welcome!!")
});