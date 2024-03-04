const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Assuming you have a User model defined elsewhere
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category' // Assuming you have a Category model defined elsewhere
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  dueDate: {
    type: Date,
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
}, {timestamps: true, versionKey: false} );

// Middleware to handle the "updatedAt" field update
taskSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;
