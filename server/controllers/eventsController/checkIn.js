var eventModels = require('../../models/eventModels');

module.exports = (req, res) => {
	if (!req.body.eventId || !req.body.userId) {
		res.status(400).send('Invalid Input');
		return;
	}
	eventModels.checkIn(req.body.eventId, req.body.userId)
	.then( success => {
		res.sendStatus(201);
	})
	.catch( error => {
		console.log(error);
		res.status(400).send('An error occured');
	})
}