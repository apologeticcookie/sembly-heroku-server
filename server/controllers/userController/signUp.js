// signUp.js
var userModels = require('../../models/userModels');

module.exports = (req, res) => {
  var user = req.body;
  console.log('Request body User ',user);

  userModels.addUser(user)
  .then(success => {
    res.status(201).send('User created!');
  })
  .catch(error => {
    console.log('ERRROR !!1 ', error);
    res.status(400).send('Username already exists');
  })
}
