const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs') ;
const jwt = require('jsonwebtoken') ;


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        default: "Anonymous"
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
        }
    }],
}, {
	timestamps: true
});

userSchema.virtual('objects', {
	ref: 'object',
	localField: '_id',
	foreignField: 'owner'
});

userSchema.pre('save', async function (next) {
	const user = this ;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}
	next()
}) ;

userSchema.methods.toJSON = function () {
	const user = this ;
	const userObject = user.toObject() ;

	delete userObject.password ;
	delete userObject.tokens ;

	return userObject
} ;

userSchema.methods.generateAuthToken = async function () {
	const user = this ;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY) ;

	user.tokens = user.tokens.concat({ token }) ;
	await user.save() ;

	return token
} ;


userSchema.plugin(passportLocalMongoose);

const user = mongoose.model('User', userSchema);

module.exports = user ;