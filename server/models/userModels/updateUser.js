var User = require('../../schemas/userSchema')

module.exports = (userObj) => {
	return User.findOneAndUpdate({
		'email': userObj.email
	}, {
		$set: {
			location: userObj.location,
			photoUrl: userObj.photoUrl
		}
	})
	.then(searchResult => {
    console.log('This is what success is ')
		return User.findOneAndUpdate({
      'email': userObj.email
		}, {
		})
	})
	// .then( success => {
	// 	// return User.findOneAndUpdate({
	// 	// 	'_id': friendId
	// 	// }, {
	// 	// 	$push: {
	// 	// 		friends: userId
	// 	// 	}
	// 	// })
	// })
}
