// logIn.js
var userModels = require('../../models/userModels');

module.exports = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  userModels.logIn(email, password)
  .then( response => {
    if (response === 'Incorrect Password') {
    	res.status(400).send('Incorrect Password');
    } else if (response === 'User does not exist') {
    	res.status(400).send('Incorrect Password');
    } else {
    	res.status(200).send(response);
    }
  });
}