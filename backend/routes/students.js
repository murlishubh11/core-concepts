const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const auth = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');


// POST /students — Register a student
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, batch, password } = req.body;
    const hashed = await bcrypt.hash(password || '123456', 10); // default pass
    const student = new Student({ name, email, phone, batch, password: hashed });
    await student.save();
    res.status(201).json({ message: 'Student registered', student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /students — Get all students
router.get('/', async (req, res) => {
  try {
    // .populate('batch') replaces batch ObjectId with actual batch data
    const students = await Student.find().populate('batch');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;