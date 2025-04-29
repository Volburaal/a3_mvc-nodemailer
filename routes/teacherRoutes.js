const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

const role = 'teacher'

router.get('/login', (req, res) => res.render('login', {role}));
router.post('/login', teacherController.login);
router.get('/dashboard', teacherController.dashboard);
router.post('/send-email', teacherController.mail);

module.exports = router;
