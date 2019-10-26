const express = require('express');
const passport = require('../passport');

const router = new express.Router();

router.post('/objects', async (req, res)=>{
	// TODO: Add code for adding object to the database
	// While adding object/objects to the database,
	// if you find that they already exist, then update them
});

module.exports = router ;