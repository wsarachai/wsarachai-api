const fs = require('fs');
const studentService = require('../services/studentService');

let textIn = fs.readFileSync(`${__dirname}/studentFrm.html`, 'utf-8');
let textResilt = fs.readFileSync(`${__dirname}/studentDone.html`, 'utf-8');

exports.createStudentFrm = (req, res) => {
  console.log(req.body);
  console.log(req.query.userId);

  textIn = textIn.replace("{userId}", req.query.userId);

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(textIn);
};

exports.createStudent = (req, res) => {
  try {
    studentService.createStudent(req.body).then(newUser => {
      console.log(newUser);
      textResilt = textResilt.replace("{result}", "สำเร็จ!!");
      res.status(200).send(textResilt);

      console.log(newUser);
    });
  } catch (err) {
    textResilt = textResilt.replace("{result}", "ไม่สำเร็จ ให้ติดต่ออาจารย์!! (นักศึกษาอาจลงทะเบียนแล้วลองใช้คำสั่ง 'Info')");
    res.status(400).send(textResilt);
  }
};

exports.getAllStudent = async (req, res) => {
  const students = await studentService.getAllStudents();
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    data: students,
  });
};


