// rejectRequest.js
var friendModels = require('../../models/friendModels');

module.exports = (req, res) => {
	if (!req.body.userId || !req.body.friendId) {
		res.status(400).send('Invalid Input');
		return;
	}
	friendModels.rejectFriend(req.body.userId, req.body.friendId)
	.then( success => {
		res.sendStatus(201);
	})
	.catch( error => {
		console.log(error);
		res.status(400).send('An error occured');
	})
}