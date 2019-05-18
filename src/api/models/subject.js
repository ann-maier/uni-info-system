const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  subject: String
});

module.exports = mongoose.model('Subject', SubjectSchema);