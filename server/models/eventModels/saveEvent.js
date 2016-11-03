// saveEvent.js
var Event = require('../../schemas/eventsSchema');
var User = require('../../schemas/userSchema');

module.exports = (eventId, userId) => {
	return Event.findOneAndUpdate({
		'_id': eventId
	}, {
		$pull: {
			'savedUsers': userId
		}
	}).exec()
	.then( success => {
		return User.findOneAndUpdate({
		'_id': userId
		}, {
		$pull: {
			'saved': eventId
		}
		}).exec()
	})
	.then( success => {
		return Event.findOneAndUpdate({
			'_id': eventId
		}, {
			$push: {
				'savedUsers': userId
			}
		}).exec()
	})
	.then( success => {
		return User.findOneAndUpdate({
		'_id': userId
		}, {
		$push: {
			'saved': eventId
		}
		}).exec()
	})
}