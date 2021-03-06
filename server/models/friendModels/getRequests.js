// getRequests.js


var User = require('../../schemas/userSchema')

module.exports = (userId) => {
	return User.findOne({'_id': userId})
	.populate('requests')
	.exec();
}