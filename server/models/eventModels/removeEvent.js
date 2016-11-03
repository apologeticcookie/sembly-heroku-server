// removeEvent.js
var Event = require('../../schemas/eventsSchema');

module.exports = (eventId) => {
	return Event.findOne({'_id': eventId})
	.then( event => {
		event.remove();
	});
}