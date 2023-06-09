const studentService = require("../services/studentService");
const sessionService = require("../services/sessionService");
const registerService = require("../services/registerService");
const attenService = require("../services/attenService");
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
  const date2 = new Date('2023-05-22 ' + time);
  const date3 = new Date('2023-05-22 ' + time);

  date2.setMinutes(date2.getMinutes() + 15);
  date3.setHours(date3.getHours() + 1);

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



exports.getStudentFrm = (req, res) => {
  console.log(req.query);
  theme.addVendors(["liff", "jquery"]);
  theme.addJavascriptFile("js/custom/register/liff-get-student.js");

  res.render(theme.getPageViewPath("itscis", "register"), {
    currentLayout: theme.getLayoutPath("default"),
    liff: '1661172872-N4g4kl7y'
  });
};

exports.updateStudent = async (req, res) => {
  const student = await studentService.findByStudentId(req.body.studentId);
  if (student) {
    let newUser = {
      lineId: req.body.lineId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nickname: req.body.nickname,
    };
    studentService
      .update(student._id, newUser)
      .then((user) => {
        console.log(user);

        // res.render(theme.getPageViewPath("itscis", "register-result"), {
        //   currentLayout: theme.getLayoutPath("default"),
        //   message: "สำเร็จ!!",
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.getAllStudent = async (req, res) => {
  const students = await studentService.getAll();
  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    data: students,
  });
};

exports.getStudentByLineId = async (req, res) => {
  const student = await studentService.findByLineId(req.params.id);
  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    data: student,
  });
};

exports.getStudentById = async (req, res) => {
  const student = await studentService.findByStudentId(req.params.id);
  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    data: student,
  });
};

exports.attenForm = (req, res) => {
  console.log(req.query.lineId);

  theme.addVendors(["liff", "jquery"]);
  theme.addJavascriptFile("js/custom/authentication/get-location.js");
  res.render(theme.getPageViewPath("itscis", "student-attention"), {
    currentLayout: theme.getLayoutPath("atten-layout"),
    lineId: req.query.lineId,
    course: req.query.course
  });
};

exports.atten = async (req, res) => {
  var message = "ลงชื่อเข้าเรียนไม่สำเร็จ ให้ติดต่ออาจารย์!!"
  console.log(req.body);

  // for tes on Mac
  //req.body.lineId = "Uaa87542acc2a6380d218823e6188126d";
  //req.body.course = "IT241";
  // for tes on

  if (req.body.userLocation && req.body.course && req.body.lineId) {
    const location = JSON.parse(req.body.userLocation);
    const student = await studentService.findByLineId(req.body.lineId);
    const registers = await registerService.findByStudentId(student._id);

    message = `${student.studentId} ${student.firstName} ${student.lastName}: ลงชื่อเข้าเรียนไม่สำเร็จ ให้ติดต่ออาจารย์!!`;

    let status = "absent";
    for (var i = 0; i < registers.length; i++) {
      var reg = registers[i];
      // console.log(reg);
      const session = await sessionService.findById(reg.session);
      const course = await courseService.getById(session.course);
      if (session) {
        // console.log(session._id);
        status = timeInRanges(session.startTime);
        if ((status === 'atten' || status === 'late') && req.body.course === course.subject.code) {
          const distance = calculateDistance(
            location.latitude,
            location.longitude,
            session.location.latitude,
            session.location.longitude
          );

          console.log("Distance: ", distance.toFixed(2), "km"); // Output: 3934.44 kilometers

          if (distance <= 0.05) {
            console.log(reg);

            const now = new Date();
            const day = `${now.getDate()}`;
            const month = `${now.getMonth()}`;
            const attenTime = `${now.getHours()}:${now.getMinutes()}:00`;

            let alreadyCheckIn = false;
            for (let i = 0; i < reg.attendances.length; i++) {
              const atten = await attenService.findById(reg.attendances[i]);
              if (atten.course.day === day) {
                alreadyCheckIn = true;
              }
            }

            if (!alreadyCheckIn) {
              const atten = await attenService.create({
                register: reg._id,
                status: status,
                day: day,
                month: month,
                timeAtten: attenTime
              });
              console.log(atten);
              await registerService.appendAttendance(reg._id, atten.data);
              message = `${student.studentId} ${student.firstName} ${student.lastName}: ลงชื่อเข้าเรียนสำเร็จ!! [${status}]`;
            } else {
              message = `${student.studentId} ${student.firstName} ${student.lastName}: ได้ลงชื่อเข้าเรียนแล้ว!!`;
            }
          } else {
            message = `${student.studentId} ${student.firstName} ${student.lastName}: ลงชื่อเข้าเรียนไม่สำเร็จ ไม่ได้อยู่ในห้องเรียน กรุณาเข้าห้องเรียนเพื่อลงชื่อ!!`;
          }
          break;
        }
      }
    }
  }
  res.render(theme.getPageViewPath("itscis", "student-attention-result"), {
    currentLayout: theme.getLayoutPath("atten-layout"),
    message: message,
  });
};


exports.attenCheck = (req, res) => {
  //theme.addVendors(["liff", "jquery"]);
  res.render(theme.getPageViewPath("itscis", "student-attention-result"), {
    currentLayout: theme.getLayoutPath("atten-layout"),
    message: "ยังไม่ได้ทำ",
  });
};
