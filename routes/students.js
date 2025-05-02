const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Create a new student
router.post('/', async (req, res) => {
  try {
    const { studentId, firstName, lastName, fingerprintTemplate } = req.body;
    const student = await Student.create({ studentId, firstName, lastName, fingerprintTemplate });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  try {
    const { studentId, firstName, lastName, fingerprintTemplate } = req.body;
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    await student.update({ studentId, firstName, lastName, fingerprintTemplate });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    await student.destroy();
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
