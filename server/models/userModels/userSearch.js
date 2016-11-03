// userSearch.js
var User = require('../../schemas/userSchema')

module.exports = (search) => {
	return User.find({$or: [
		{email: new RegExp(search,'i')},
		{firstName: new RegExp(search,'i')},
		{lastName: new RegExp(search,'i')},
	]})
}