const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');


exports.login = async (req, res) => {
  const { rollnumber, password } = req.body;
  console.log(req.body)
  const student = await prisma.student.findUnique({ where: { rollnumber: req.body.username } });

  if (student && bcrypt.compareSync(password, student.password)) {
    req.session.student = student;
    return res.redirect('/student/dashboard');
  }
  res.render('login', { error: 'Invalid credentials!' });
};

exports.dashboard = async (req, res) => {
  const student = req.session.student;
  if (!student) return res.redirect('/login');
  const marks = await prisma.marks.findMany({
    where: { studentId: student.id },
  });
  res.render('dashboard', { student, marks });
};

exports.mail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_ADDRESS,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const emailContent = `
    <h1 style="color:rgb(213, 238, 255); text-align:center; background-color: rgb(67, 0, 87); padding: 2%; margin:0px; border-radius: 50px 50px 0px 0px;">Test Mail</h1>
    <div style="color: rgb(248, 199, 255); background-color: rgb(49, 49, 49); margin: 0px; padding: 5%; border-radius: 0px 0px 50px 50px;">
        <h3 style="text-align: center;"><b>Please Ignore</b><br></h3>
        <h2><b>Todays Agenda</b><br></h2>
        <p style="text-align: justify; word-wrap: break-word; white-space: normal;">Nothing, we dont need any agenda</p>
        <br>
       
        <h5>Are we your prey alone? or are we just a stepping stone for taking back the throne</h5>
      </div>
  `;
  const mailOptions = {
    from: process.env.SENDER_ADDRESS,
    to: 'hannan.farooq@nu.edu.pk',
    subject: 'Dear Sir, Please ignore this email notification',
    html: emailContent,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
    return res.status(200).json({ message: 'Meeting scheduled and emails sent', meetingId: meeting.id });
  });
};