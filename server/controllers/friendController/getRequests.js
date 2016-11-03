// getRequests.js

var friendModels = require('../../models/friendModels');

module.exports = (req, res) => {
	if (!req.body.userId) {
		res.status(400).send('Invalid Input');
		return;
	}
	friendModels.getRequests(req.body.userId)
	.then( user => {
		res.status(200).send(user.requests);
	})
	.catch( error => {
		console.log(error);
		res.status(400).send('An error occured');
	})
}