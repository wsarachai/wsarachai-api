import studentJson from "./json/students-6304106xxx.json";
import registerService from "./services/registerService";
import studentService from "./services/studentService";
import sessionService from "./services/sessionService";

const sessions: string[] = [
  "647075eecbe9b20b97d51294", // 646cccee42758d6e02cf8534 IT241-lec #combined
  "647078ad4ff6cc0d535470dd", // 646cccee42758d6e02cf8534 IT241-lab #sec 1
  "64707624cbe9b20b97d5129a", // 646cccee42758d6e02cf8534 IT241-lab #sec 2
  "6470764dcbe9b20b97d5129e", // 646ccd2b42758d6e02cf8537 IT493-lec
  "647078ee4ff6cc0d535470e1", // 646ccd2b42758d6e02cf8537 IT493-lab
];

// Register students id #6304106xxx to IT241-lec
const setep_1 = () => {
  studentJson.data.forEach((student) => {
    const sessionId: string = "647075eecbe9b20b97d51294";
    const reg = {
      student: student._id,
      session: sessionId,
      midTermScore: 0,
      finalScore: 0,
      projectScore: 0,
      grade: "",
    };

    // const newReg = JSON.stringify(reg);
    console.log(reg);

    registerService
      .create(reg)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

const setep_2 = () => {
  const reg = {
    student: "646e11e33d79862687a09734",
    session: "647078ad4ff6cc0d535470dd",
    midTermScore: 0,
    finalScore: 0,
    projectScore: 0,
    grade: "",
  };

  registerService
    .create(reg)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const timeInRanges = (time: string) => {
  let result = "absent";
  console.log(time);
  const times: string[] = time.split(":");
  // const now = new Date();
  // const stuTime = new Date(
  //   `2023-05-22 ${now.getHours()}:${now.getMinutes()}:00`
  // );
  // const date1 = new Date("2023-05-22 " + time);
  // const date2 = new Date(
  //   `2023-05-22 ${times[0]}:${parseInt(times[1]) + 15}:00`
  // );
  // const date3 = new Date(`2023-05-22 ${parseInt(times[0]) + 1}:${times[1]}:00`);

  // // Verify if the first time is equal, more recent or less recent than the second
  // if (
  //   stuTime.getTime() >= date1.getTime() &&
  //   stuTime.getTime() <= date2.getTime()
  // ) {
  //   result = "atten";
  // } else if (
  //   stuTime.getTime() > date2.getTime() &&
  //   stuTime.getTime() <= date3.getTime()
  // ) {
  //   result = "late";
  // }
  return result;
};

const test = async () => {
  const student = await studentService.findByLineId(
    "Uaa87542acc2a6380d218823e6188126d"
  );
  const retisters = await registerService.findByStudentId(student._id);
  retisters.forEach(async (reg) => {
    const session = await sessionService.sessionFindById(reg.session);
    console.log(session);
    //console.log(timeInRanges(session.startTime));
  });
};

test();
