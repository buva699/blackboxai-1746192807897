const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance');
const Student = require('../models/student');
const Memo = require('../models/memo');

// Log attendance for a student
router.post('/', async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    // Validate student exists
    const student = await Student.findByPk(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // Create attendance record
    const attendance = await Attendance.create({ studentId, date, status });

    // Update late count and remarks if status is 'late'
    if (status === 'late') {
      student.lateCount += 1;
      if (student.lateCount >= 3) {
        // Generate memo if late 3 times
        await Memo.create({
          studentId: student.id,
          memoText: 'Student has been late 3 times. Please take necessary action.',
          dateIssued: new Date(),
        });
        attendance.memoGenerated = true;
        await attendance.save();
      }
      student.remarks = `Late ${student.lateCount} time(s)`;
      await student.save();
    }

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance records for a student
router.get('/student/:studentId', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.findAll({
      where: { studentId: req.params.studentId },
      include: [{ model: Student }],
    });
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.findAll({
      include: [{ model: Student }],
    });
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
