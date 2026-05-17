const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// POST /attendance — Mark attendance
router.post('/', async (req, res) => {
  try {
    const { student, status, batch } = req.body;

    // Create object from Attendance model
    const record = new Attendance({ student, status, batch });
    await record.save();

    res.status(201).json({ message: 'Attendance marked', record });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /attendance/:studentId — Get attendance of one student
router.get('/:studentId', async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.params.studentId })
      .populate('student', 'name email')  // only get name & email from Student
      .populate('batch', 'name');

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;