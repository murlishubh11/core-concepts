const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['present', 'absent'], required: true },
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }
});
module.exports = mongoose.model('Attendance', AttendanceSchema);