const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: String, // Add this line to include email in replies
  reply: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: [{ type: String }], // Change type to String
  dislikedBy: [{ type: String }], // Change type to String
});

const questionSchema = new mongoose.Schema({
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: String, // Add this line to include email in the user field
  },
  email: String, // Add this line to include email in the question itself
  question: String,
  replies: [replySchema],
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: [{ type: String }], // Change type to String
  dislikedBy: [{ type: String }], // Change type to String
}, 
{ collection: 'Chatboard' });

mongoose.model('Chatboard', questionSchema);
