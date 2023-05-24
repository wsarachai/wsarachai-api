const lineConfig = require("./../utils/lineConfig");
const textMessage = require("./lineAction");
const studentService = require("../services/studentService");
//const AIMLInterpreter = require("./AIMLInterpreter");

// const aimlInterpreter = new AIMLInterpreter({
//   name: "WireInterpreter",
//   age: "47",
// });
// aimlInterpreter.loadAIMLFilesIntoArray(["./test-aiml.xml"]);

// const talkToAimlInterpreter = (event, client) => {
//   return aimlInterpreter.findAnswerInLoadedAIMLFiles(
//     event.message.text,
//     async (answer, wildCardArray, input) => {
//       // console.log(answer + ' | ' + wildCardArray + ' | ' + input);
//       if (answer === undefined) {
//         answer = "ไม่พบคำสั่งที่ต้องการ";
//       }
//       await client.replyMessage(event.replyToken, {
//         type: "text",
//         text: answer,
//       });
//     }
//   );
// };

const handleEvent = async (event, client) => {
  //console.log(client);
  console.log(event);

  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  const student = await studentService.findByLineId({ lineId: event.source.userId });
  if (student) {
    if (student.lineId) {
      client.pushMessage(event.source.userId, {
        type: "text",
        text: `นักศึกษาได้ลงทะเบียนแล้ว`
      });
      textMessage.message(event, client, "user");
    }
    else if (event.message.type === "text") {
      textMessage.message(event, client, event.message.text.toLowerCase());
    }
  } else if (event.message.text.toLowerCase().slice(0, 3) === "reg") {
    textMessage.message(event, client, event.message.text.toLowerCase());
  } else {
    //return talkToAimlInterpreter(event, client);
    client.pushMessage(event.source.userId, {
      type: "text",
      text: `ยังไม่ได้ลงทะเบียนให้พิมพ์ข้อความ "Reg:<รหัสนักศึกษา> เพื่อลงทะเบียนก่อน"`
    });
  }
};

exports.handleEvent241 = (event) => {
  handleEvent(event, lineConfig.client241);
};

exports.handleEvent493 = (event) => {
  handleEvent(event, lineConfig.client493);
};
