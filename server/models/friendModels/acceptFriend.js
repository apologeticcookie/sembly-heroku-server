// acceptFriend.js
var User = require('../../schemas/userSchema')

module.exports = (userId, friendId) => {
	console.log('1 UserID ',userId,'Friends ID ',friendId);
	return User.findOneAndUpdate({
		'_id': userId
	}, {
		$pull: {
			requests: friendId
		}
	})
	.then(success => {
		console.log('2 UserID ',userId,'Friends ID ',friendId, ' ', success.friends);
		return User.findOneAndUpdate({
			'_id': userId
		}, {
			$push: {
				friends: friendId
			}
		})
	})
	.then( success => {
		console.log('3 UserID ',userId,'Friends ID ',friendId, ' ', success.friends);
		return User.findOneAndUpdate({
			'_id': friendId
		}, {
			$push: {
				friends: userId
			}
		})
	})
}
