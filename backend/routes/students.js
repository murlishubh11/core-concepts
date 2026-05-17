const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const auth = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');


// POST /students/register — Student self-signup (no auth needed)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, batch } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const student = new Student({
      name,
      email,
      password: hashed,
      phone: phone || '',
      batch: batch || null
    });

    await student.save();
    res.json({ message: 'Student account created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// POST /students — Admin adds a student (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, batch, password } = req.body;
    const hashed = await bcrypt.hash(password || '123456', 10);
    const student = new Student({ name, email, phone, batch, password: hashed });
    await student.save();
    res.status(201).json({ message: 'Student registered', student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// GET /students — Get all students (admin)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('batch');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;