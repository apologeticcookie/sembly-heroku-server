// getUsers.js
var userModels = require('../../models/userModels');

module.exports = (req, res) => {
	var search = req.params.search;
	userModels.userSearch(search)
	.then( users => {
		res.status(200).send(users);
	})
	.catch( err => {
		res.status(400).send('Error Occured');
	})
}