const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  User class for both registration and login
const WaitListSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now() }
});

const WaitList = mongoose.model('waitlist', WaitListSchema);
module.exports = WaitList;