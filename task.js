const mongoose = require('mongoose');
async function connection(){
  await mongoose.connect("mongodb+srv://rakshitajawai06_db_user:XlNuu2HCGgWOgdyD@cluster0.oqzacwa.mongodb.net/ecom.dum")
}
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assumes a 'User' model exists
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Optional: Add a pre-save hook to update updatedAt on every save
taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
connection();
console.log('db connected successfully');