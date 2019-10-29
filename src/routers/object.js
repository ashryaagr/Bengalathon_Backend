const express = require('express');
const request = require('request');
const Obj = require('../models/object');
const fs = require("fs");
const router = new express.Router();

router.post('/objects', async (req, res)=>{
	callFlask().then().catch(err=>{
		console.log(err)
	})
});

// This function has to be kept synchronous
function callFlask(){
	const image = fs.readFileSync(fs.readFileSync(path.join(__dirname, "frame.jpg")));
	const result = request.post(process.env.FLASK_URL, { image }) ;
	var collection = [];
	for(var i=0; i<process.env.MAX_OBJECTS; i++){
		const box = result['detection_boxes'][i];
		const name = result['detection_class_entities'][i];
		Obj.find({name}, function (err, o){
			if (o===null) {
				o = Obj.create({name, x1: box[0], x2: box[1], x3: box[2], x4: box[3]});
			}else {
				o.x1 = box[0];
				o.x2 = box[1];
				o.x3 = box[3];
				o.x4 = box[4];
			}
			o.save().then().catch(err => console.log(err));
			collection.push(o);
		})
	}
	collection.forEach(o=>{
		var nearest=null, dist=100000;
		collection.forEach(a=>{
			if (a!==o){
				if(distance(o, a)<dist){
					nearest = a;
					dist = distance(a, o)
				}
			}
		});
		o.nearest = nearest;
		o.save().then().catch(err=>{
			console.log(err)
		})
	})
}

function distance(o1, o2){
	return (o1.x2 + o1.x4 - o2.x2 + o2.x4) ** 2 + (o1.x1 + o1.x3 - o2.x1 - o2.x3) ** 2;
}

module.exports = router ;