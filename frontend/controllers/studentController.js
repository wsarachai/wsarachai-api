const studentService = require("../services/studentService");
const courseService = require("../services/courseService");

const degToRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

const timeInRanges = (time) => {

  let result = "absent";
  const times = time.split(":");
  const now = new Date();
  const stuTime = new Date(`2023-05-22 ${now.getHours()}:${now.getMinutes()}:00`);
  const date1 = new Date('2023-05-22 ' + time);
  const date2 = new Date(`2023-05-22 ${times[0]}:${parseInt(times[1]) + 15}:00`);
  const date3 = new Date(`2023-05-22 ${parseInt(times[0]) + 1}:${times[1]}:00`);

  // Verify if the first time is equal, more recent or less recent than the second
  if (stuTime.getTime() >= date1.getTime() && stuTime.getTime() <= date2.getTime()) {
    result = "atten";
  }
  else if (stuTime.getTime() > date2.getTime() && stuTime.getTime() <= date3.getTime()) {
    result = "late";
  }
  return result;
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
  console.log(req.query);
  if (req.query.studentId) {
    res.render(theme.getPageViewPath("itscis", "register"), {
      currentLayout: theme.getLayoutPath("default"),
      userId: req.query.userId,
    });
  } else {
      res.render(theme.getPageViewPath("itscis", "register-result"), {
        currentLayout: theme.getLayoutPath("default"),
        message: "ไม่สำเร็จ ให้ติดต่ออาจารย์!!",
      });
  }
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
    userId: req.query.userId,
    course: req.query.course
  });
};

exports.attenCheck = async (req, res) => {
  let message = "ลงชื่อเข้าเรียนไม่สำเร็จ ให้ติดต่ออาจารย์!!"
  console.log(req.body);
  if (req.body.userLocation && req.body.course && req.body.userId) {
    const location = JSON.parse(req.body.userLocation);
    const course = await courseService.findOne(req.body.course);

    if (course) {
      let status = timeInRanges(course.startTime);
      if (status === "atten" || status === "late") {
        const student = await studentService.findOne({ userId: req.body.userId });

        // Example usage
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          course.location.latitude,
          course.location.longitude
        );

        console.log(distance.toFixed(2)); // Output: 3934.44 kilometers

        if (distance <= 0.05) {
          message = `${student.code} ${student.firstName} ${student.lastName}: ลงชื่อเข้าเรียนสำเร็จ`;
        } else {
          message = `${student.code} ${student.firstName} ${student.lastName}: ลงชื่อเข้าเรียนไม่สำเร็จ, อยู่นอกระยะห้องเรียนกรุณาเข้าไปเช็คชื่อในห้องเรียนเท่านั้น`;
        }
      }
    }
  }
  res.render(theme.getPageViewPath("itscis", "student-attention-result"), {
    currentLayout: theme.getLayoutPath("atten-layout"),
    message: message,
  });
};
