const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  duration: String  // e.g. "3 months"
});
module.exports = mongoose.model('Course', CourseSchema);