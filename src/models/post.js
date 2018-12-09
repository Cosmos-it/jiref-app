const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post schema
const PostSchema = new Schema({

  // General post 
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  text: { type: String, required: true },
  name: { type: String, },
  avatar: { type: String, },
  date: { type: Date, default: Date.now },

  // Likes
  likes: [{
    user: { type: Schema.Types.ObjectId, ref: 'users' }
  }],

  // Comments
  comments: [{
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    text: { type: String, required: true },
    name: { type: String },
    avatar: { type: String },
    date: { type: Date, default: Date.now }
  }]
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;