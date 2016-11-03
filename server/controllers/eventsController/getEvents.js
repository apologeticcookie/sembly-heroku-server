var eventModels = require('../../models/eventModels');

module.exports = (req, res) => {
	if (!req.body.location) {
		res.status(400).send('Invalid Input');
		return;
	}
	eventModels.getEvents(req.body.location)
	.then( events => {
		res.status(200).send(events);
	})
	.catch( error => {
		console.log(error);
		res.status(400).send('An error occured');
	})
}