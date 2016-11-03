// getEvent.js
var Event = require('../../schemas/eventsSchema');

module.exports = (eventId) => {
	return Event.findOne({'_id': eventId})
	.populate('invitedUsers')
	.populate('checkedInUsers')
	.populate('savedUsers')
	.exec();
}