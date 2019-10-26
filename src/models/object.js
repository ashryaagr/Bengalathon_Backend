const mongoose = require('mongoose');


const objectSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'user',
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
	}
	// TODO: Add a field for storing the nearest objects
});

const Object = mongoose.model('Object', objectSchema);

module.exports = Object ;