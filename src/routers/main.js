const express = require('express');
const Object = require('../models/object');

const router = new express.Router();

router.post('/', async (req, res)=>{
	const name = req.body.queryResult.queryText.split(" ").splice(-1)[0];
	Object.findOne({name}, async (err, obj)=>{
		if (obj===null){
			return res.status(404).send()
		}
		if(err){
			console.log(err);
			return res.status(500).send()
		}
		const o = await Object.findById(obj.nearest)
		res.json({
			fulfillmentText : "It is near " + o.name
		})
	})
});

module.exports = router;