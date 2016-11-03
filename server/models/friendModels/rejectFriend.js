// rejectFriend.js
var User = require('../../schemas/userSchema');

module.exports = (userId, friendId) => {
	return User.findOneAndUpdate({
		'_id': userId
	}, {
		$pull: {
			requests: friendId
		}
	})
}