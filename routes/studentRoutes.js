const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

const role = 'student'

router.get('/login', (req, res) => res.render('login', {role}));
router.post('/login', studentController.login);
router.get('/dashboard', studentController.dashboard);
router.post('/send-email', studentController.mail);

module.exports = router;
