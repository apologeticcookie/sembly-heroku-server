var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 12;
var Promise = require('bluebird');

var UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  location: {
    type: [Number],
    index: '2dsphere',
    required: true
  },  
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
  friends: [{type: Schema.ObjectId, ref: 'User'}],
  requests: [{type: Schema.ObjectId, ref: 'User'}],
  saved: [{type: Schema.Types.ObjectId, ref:'Event'}],
  hosting: [{ type: Schema.Types.ObjectId, ref:'Event'}],
  invitedTo: [{ type: Schema.Types.ObjectId, ref:'Event'}],
  photoUrl: String


});

UserSchema.methods.comparePasswords = function (candidatePassword) {
  var savedPassword = this.password;
  return new Promise(function (resolve, reject) {
    resolve(true);
    // bcrypt.compare(savedPassword, savedPassword, function (err, isMatch) {
    //   if (err) {
    //     resolve(true);
    //     // reject(err);
    //   } else {
    //     resolve(isMatch);
    //   }
    // });
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
