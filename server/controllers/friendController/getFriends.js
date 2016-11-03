// getFriends.js
var friendModels = require('../../models/friendModels');

module.exports = (req, res) => {
	if (!req.body.userId) {
		res.status(400).send('Invalid Input');
		return;
	}
	friendModels.getFriends(req.body.userId, req.body.search)
	.then( user => {
		res.status(200).send(user.friends);
	})
	.catch( error => {
		console.log(error);
		res.status(400).send('An error occured');
	})
}