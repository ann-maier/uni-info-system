const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  first_name: String,
  last_name: String,
  group: String,
  subjects: [
    {
      subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
      assessment: Boolean,
      lecturer: String
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);