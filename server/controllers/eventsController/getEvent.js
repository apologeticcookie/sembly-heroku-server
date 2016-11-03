// getEvent.js
var eventModels = require('../../models/eventModels');

module.exports = (req, res) => {
	var id = req.params.eventId;
	eventModels.getEvent(id)
	.then( event => {
		res.status(200).send(event);
	})
	.catch( error => {
		console.log(error);
		res.status(400).send('An error occured');
	})
}