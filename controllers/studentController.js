const fs = require('fs');
const User = require('./../models/userModel');

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

exports.createStudent = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        textResilt = textResilt.replace("{result}", "สำเร็จ!!");
        res.status(200).send(textResilt);

        console.log(newUser);
        // res.status(200).json({
        //     status: 'success',
        //     data: newUser,
        // });
      } catch (err) {
        textResilt = textResilt.replace("{result}", "ไม่สำเร็จ ให้ติดต่ออาจารย์!! (นักศึกษาอาจลงทะเบียนแล้วลองใช้คำสั่ง 'Info')");
        res.status(400).send(textResilt);
        // res.status(400).json({
        //     status: 'failed',
        //     message: err,
        // });
      }
};


