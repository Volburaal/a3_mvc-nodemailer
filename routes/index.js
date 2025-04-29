const express = require('express');
const router = express.Router();
const teacherRoutes = require('./teacherRoutes');
const studentRoutes = require('./studentRoutes');

router.use('/teacher', teacherRoutes);
router.use('/student', studentRoutes);

module.exports = router;
