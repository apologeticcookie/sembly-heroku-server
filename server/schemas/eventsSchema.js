var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userSchema');
var eventSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  location: {
    type: [Number],
    index: '2dsphere',
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  image: String,
  tags: [String],
  invitedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  checkedInUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  visibility: {
    type: String,
    default: 'public'
  },
  savedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

eventSchema.pre('save', function (next) {
  if(!this.endTime){
    this.endTime = new Date(this.startTime.getTime());
    this.endTime.setHours(this.endTime.getHours() + 6);
  }
  next();
});

eventSchema.pre('remove', function(next) {
  var id = this._id;
  this.invitedUsers.forEach( user => {
    User.findOneAndUpdate({
      '_id': user
    }, {
      $pull: {
        'invitedTo': id
      }
    }).exec()
  })
  this.savedUsers.forEach( user => {
    User.findOneAndUpdate({
      '_id': user
    }, {
      $pull: {
        'saved': id
      }
    }).exec();
  });
  next();
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
