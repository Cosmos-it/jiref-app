const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Profile Schema
const ProfileSchema = new Schema({

  // General info
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  me: { type: String, required: true, max: 40 },
  company: { type: String },
  website: { type: String },
  location: { type: String },
  status: { type: String, required: true },
  skills: { type: [String], required: true },
  mentorshipInterest: { type: [String], required: false},
  bio: { type: String },
  githubusername: { type: String },

  // Experience
  experience: [{
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    from: { type: Date, required: true },
    to: { type: Date },
    current: { type: Boolean, default: false },
  }],

  // Education
  education: [{
    school: { type: String, required: true },
    degree: { type: String, required: true },
    fieldofstudy: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date },
    current: { type: Boolean, default: false }
  }],

  // Project
  project: [{
    name: { type: String, required: true },
    githubproject: { type: String, required: true },
    description: { type: String, required: true },
    timetaken: { type: String, required: true }
  }],

  // Followers
  followers: [{
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    name: { type: String },
    avatar: { type: String },
    date: { type: Date, default: Date.now }
  }],

  // Social media
  social: {
    github: { type: String },
    linkedin: { type: String }
  },

  date: {
    type: Date, default: Date.now
  }

});


const Profile = mongoose.model('profiles', ProfileSchema);
module.exports = Profile;