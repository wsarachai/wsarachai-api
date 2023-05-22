const studentService = require("../services/studentService");

exports.createStudentFrm = (req, res) => {
  console.log(req.body);
  console.log(req.query.userId);

  res.render(theme.getPageViewPath("itscis", "register"), {
    currentLayout: theme.getLayoutPath("default"),
    userId: req.query.userId,
  });
};

exports.createStudent = (req, res) => {
  studentService
    .create(req.body)
    .then((newUser) => {
      console.log(newUser);

      res.render(theme.getPageViewPath("itscis", "register-result"), {
        currentLayout: theme.getLayoutPath("default"),
        message: "สำเร็จ!!",
      });
    })
    .catch((err) => {
      console.log(err);

      res.render(theme.getPageViewPath("itscis", "register-result"), {
        currentLayout: theme.getLayoutPath("default"),
        message:
          "ไม่สำเร็จ ให้ติดต่ออาจารย์!! (นักศึกษาอาจลงทะเบียนแล้วลองใช้คำสั่ง 'Info')",
      });
    });
};

exports.getAllStudent = async (req, res) => {
  const students = await studentService.getAll();
  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    data: students,
  });
};

exports.atten = (req, res) => {
  console.log(req.body);
  console.log(req.query.userId);

  theme.addJavascriptFile("js/custom/authentication/get-location.js");
  res.render(theme.getPageViewPath("itscis", "student-attention"), {
    currentLayout: theme.getLayoutPath("atten-layout"),
    userId: req.query.userId,
    course: "it241",
  });
};
