const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Assuming you have a User model defined elsewhere
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets to current date and time
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to handle the "updatedAt" field update
taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;
