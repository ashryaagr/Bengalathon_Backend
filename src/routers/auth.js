const express = require("express");
const passport = require("../passport");

const router = new express.Router();

router.post('/login', async (req, res)=>{
	//TODO: Add code for login
});


router.post('/signup', async (req, res)=>{
	// TODO: Add code for signup
});

router.post('/logout', async (req, res)=>{
	// 	TODO: Add code for logout
});

module.exports = router ;