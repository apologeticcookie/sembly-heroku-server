// signUp.js
var userModels = require('../../models/userModels');

module.exports = (req, res) => {
  var user = req.body;
  userModels.addUser(user)
  .then(success => {
    res.status(201).send('User created!');
  })
  .catch(error => {
    res.status(400).send('Username already exists');
  })
}