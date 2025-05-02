const express = require('express');
const router = express.Router();
const Memo = require('../models/memo');
const Student = require('../models/student');

// Get all memos
router.get('/', async (req, res) => {
  try {
    const memos = await Memo.findAll({
      include: [{ model: Student }],
    });
    res.json(memos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get memos for a specific student
router.get('/student/:studentId', async (req, res) => {
  try {
    const memos = await Memo.findAll({
      where: { studentId: req.params.studentId },
      include: [{ model: Student }],
    });
    res.json(memos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
