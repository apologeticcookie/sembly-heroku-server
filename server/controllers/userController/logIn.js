// logIn.js
var userModels = require('../../models/userModels');
var friendModels = require('../../models/friendModels');
var userSchema = require('../../schemas/userSchema');
module.exports = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = req.body;
  userModels.logIn(email, password)
  .then( response => {
    if (response === 'Incorrect Password') {
    	res.status(400).send('Incorrect Password');
    } else if (response === 'User does not exist') {
      //Add User
      console.log('Adding a new user as logged in user doesnot exists')

      userModels.addUser(user)
      .then(success => {
        console.log('Adding new user  ');
        if(user.facebookFriends) {
          console.log('Should update firends list', user.facebookFriends);
        }
        res.status(201).send(success);
      })
      .catch(error => {
        console.log('ERRROR !!1 ', error);
        res.status(400).send(error);
      })
    	//res.status(400).send('Incorrect Password');
    } else {
      //update user
      userModels.updateUser(req.body)
      .then( responseUpdated => {
        console.log('Updating existing User location ');
        if(user.facebookFriends) {
          console.log('Should update friends list', user.facebookFriends);
          user.facebookFriends.forEach (function(friend) {
            console.log('Friend ID ', friend.id);
            userSchema.findOne({
              facebookId: friend.id
            })
            .then(function(searchResult) {
              if(searchResult) {
                if(responseUpdated.friends.indexOf(searchResult._id) < 0) {
                  friendModels.acceptFriend(responseUpdated._id, searchResult._id);
                } else {
                  console.log('Not updating because friends list already present');
                }
              }
            })
          });
        }
        res.status(200).send(responseUpdated);
      });


    }
  });
}
