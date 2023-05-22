const studentService = require("../services/studentService");
const courseService = require("../services/courseService");

const degToRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = degToRad(lat1);
  const lon1Rad = degToRad(lon1);
  const lat2Rad = degToRad(lat2);
  const lon2Rad = degToRad(lon2);

  // Calculate the differences between the latitude and longitude coordinates
  const latDiff = lat2Rad - lat1Rad;
  const lonDiff = lon2Rad - lon1Rad;

  // Calculate the distance using the Haversine formula
  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(lonDiff / 2) *
      Math.sin(lonDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance; // Distance in kilometers
};

exports.createStudentFrm = (req, res) => {
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
        message: "ไม่สำเร็จ ให้ติดต่ออาจารย์!!",
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
  console.log(req.query.userId);

  theme.addJavascriptFile("js/custom/authentication/get-location.js");
  res.render(theme.getPageViewPath("itscis", "student-attention"), {
    currentLayout: theme.getLayoutPath("atten-layout"),
    userId: "U60cc189412773ed612d8efe00854e92f", //req.query.userId,
    course: "IT241",
  });
};

exports.attenCheck = async (req, res) => {
  console.log(req.body);
  const location = JSON.parse(req.body.userLocation);

  const student = await studentService.findOne({ userId: req.body.userId });
  const course = await courseService.findOne(req.body.course);

  if (course) {
    // Example usage
    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      course.location.latitude,
      course.location.longitude
    );

    console.log(distance.toFixed(2)); // Output: 3934.44 kilometers

    if (distance <= 0.05) {
      res.render(theme.getPageViewPath("itscis", "student-attention-result"), {
        currentLayout: theme.getLayoutPath("atten-layout"),
        student: student,
        message: "ลงชื่อเข้าเรียนสำเร็จ",
      });
    } else {
      res.render(theme.getPageViewPath("itscis", "student-attention-result"), {
        currentLayout: theme.getLayoutPath("atten-layout"),
        student: student,
        message: "ลงชื่อเข้าเรียนไม่สำเร็จ",
      });
    }
  } else {
    res.render(theme.getPageViewPath("itscis", "student-attention"), {
      currentLayout: theme.getLayoutPath("atten-layout"),
      message: "ลงชื่อเข้าเรียนไม่สำเร็จ ให้ติดต่ออาจารย์!!",
    });
  }
};
