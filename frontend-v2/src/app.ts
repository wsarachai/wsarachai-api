import studentJson from "./json/students-6304106xxx.json";
import registerService from "./services/registerService";

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

registerService.findOne("6471994ed771ee45f10b6a8b").then((result) => {
  console.log(result);
});
