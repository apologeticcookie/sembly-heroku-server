var eventModels = require('../../models/eventModels');

module.exports = (req, res) => {
	if (!req.body.eventId) {
		res.status(400).send('Invalid Input');
		return;
	}
	eventModels.removeEvent(req.body.eventId)
	.then( success => {
		res.sendStatus(200);
	})
	.catch( error => {
		console.log(error);
		res.status(400).send('An error occured');
	})
}