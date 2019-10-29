const mongoose = require('mongoose');


const objectSchema = new mongoose.Schema({
    name : {
        type : String ,
		unique: true,
        required : true
    },
	// The bounding boxes have 4 coordinates, so we will store them as x1, x2, x3, x4
	x1: {
    	type: Number,
		required: true
	},
	x2: {
    	type: Number,
		required: true
	},
	x3: {
    	type: Number,
		required: true
	},
	x4: {
    	type: Number,
		required: true
	},
	// TODO: Figure out if there is a better way than simply using the IDs to fetch objects everytime
	nearbyObjects: {
    	type: [mongoose.Schema.Types.ObjectId]
	},
	nearest: mongoose.Schema.Types.ObjectId
});

const Object = mongoose.model('Object', objectSchema);

module.exports = Object ;