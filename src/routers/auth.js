const express = require("express");
const passport = require("../passport");
const User = require('../models/user');

const router = new express.Router();

router.post('/login', async (req, res)=>{
	User.findOne({ username: req.body.username }, async function(err, user) {
		if (err) {
			return res.status(500).send();
		}
		if (!user) {
			return res.status(400).send("No such username");
		}
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) {
			return res.status(400).send("Incorrect username") ;
		}
		const token = await user.generateAuthToken() ;
		res.cookie('jwt', token) ;
	}) ;
});


router.post('/signup', async (req, res)=>{
	const user = User.create(req.body);
	user.save().then(user=>{
		res.status(200).send()
	}).catch(err=>{
		res.status(500).send("Invalid data supplied")
	})
});


router.post('/logout', passport.authenticate('cookie', {}), async (req, res)=>{
	req.user.tokens = [];
	req.user.save().then(_=>{
		res.status(200).send()
	}).catch(err=>{
		res.status(401).send();
	})
});

module.exports = router ;