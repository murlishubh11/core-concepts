const mongoose = require('mongoose');
const BatchSchema = new mongoose.Schema({
  name: { type: String, required: true },  // e.g. "Morning Batch"
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  startDate: Date,
  timing: String  // e.g. "9am - 11am"
});
module.exports = mongoose.model('Batch', BatchSchema);