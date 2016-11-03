var User = require('../../schemas/userSchema')

module.exports = (userId, friendId) => {
	return User.findOneAndUpdate({
		'_id': friendId
	}, {
		$push: {
			requests: userId
		}
	})
}