const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Attendance = require('./models/Attendance');
const Batch = require('./models/Batch');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/auth', require('./routes/auth'));
app.use('/students', require('./routes/students'));
app.use('/attendance', require('./routes/attendance'));


//Student login
app.post('/student/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email }).populate('batch');
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(401).json({ error: 'Wrong password' });

    const token = jwt.sign({ id: student._id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get attendance of logged-in student
app.get('/student/attendance', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const records = await Attendance.find({ student: decoded.id }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Add this with your other routes
app.post('/batches', async (req, res) => {
  try {
    const batch = new Batch(req.body);
    await batch.save();
    res.json(batch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));