// getSaved.js

var eventModels = require('../../models/eventModels');

module.exports = (req, res) => {
	if (!req.body.userId) {
		res.status(400).send('Invalid Input');
		return;
	}
	eventModels.getSaved(req.body.userId)
	.then( user => {
		res.status(200).send(user.saved);
	})
	.catch( error => {
		console.log(error);
		res.status(400).send('An error occured');
	})
}