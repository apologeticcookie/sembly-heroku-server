// logIn.js
var Promise = require('bluebird');

var User = require('../../schemas/userSchema')

var thisUser;

//Add a new user to the database
module.exports = (email, password) => {
	return User.findOne({'email': email})
	.populate('requests').exec()
	.then(user => {
		if (!user) {
			return new Promise((resolve,reject) => {
				resolve('User does not exist');
			}) 
		}
		thisUser = user;
		return user.comparePasswords(password);
	})
	.then(match => {
		return new Promise( (resolve, reject) => {
			if (match === 'User does not exist') {
				resolve('User does not exist');
			} else if (match) {
				resolve(thisUser);
			} else {
				resolve('Incorrect Password');
			}
		})
	})
};