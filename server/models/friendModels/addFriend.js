var User = require('../../schemas/userSchema')
// this is not used !!!
module.exports = (userId, friendId) => {
	return User.findOneAndUpdate({
		'_id': friendId
	}, {
		$push: {
			requests: userId
		}
	})
}
