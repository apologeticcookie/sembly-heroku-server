// getFriends.js
var User = require('../../schemas/userSchema')

module.exports = (userId, search) => {
	var search = search || '';
	return User.findOne({'_id': userId})
	.populate({
		path: 'friends',
		match: {$or: [
		{email: new RegExp(search,'i')},
		{firstName: new RegExp(search,'i')},
		{lastName: new RegExp(search,'i')},
		]}
	})
	.exec();
}