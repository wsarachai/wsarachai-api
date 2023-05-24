const lineConfig = require("./../utils/lineConfig");
const textMessage = require("./lineAction");
const AIMLInterpreter = require("./AIMLInterpreter");
const studentService = require("../services/studentService");

const aimlInterpreter = new AIMLInterpreter({
  name: "WireInterpreter",
  age: "47",
});

aimlInterpreter.loadAIMLFilesIntoArray(["./test-aiml.xml"]);

const talkToAimlInterpreter = (event, client) => {
  return aimlInterpreter.findAnswerInLoadedAIMLFiles(
    event.message.text,
    async (answer, wildCardArray, input) => {
      // console.log(answer + ' | ' + wildCardArray + ' | ' + input);
      if (answer === undefined) {
        answer = "ไม่พบคำสั่งที่ต้องการ";
      }
      await client.replyMessage(event.replyToken, {
        type: "text",
        text: answer,
      });
    }
  );
};


const handleEvent = async (event, client) => {
  //console.log(client);
  console.log(event);

  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  const student = await studentService.findByLineId({ lineId: event.source.userId });
  if (student) {
    if (event.message.type === "text") {
      textMessage.message(event, client);
    }
  } else if (event.message.text.toLowerCase().slice(0, 3) === "reg") {
    textMessage.message(event, client, event.message.text.toLowerCase());
  } else {
    return talkToAimlInterpreter(event, client);
  }
};

exports.handleEvent241 = (event) => {
  handleEvent(event, lineConfig.client241);
};

exports.handleEvent493 = (event) => {
  handleEvent(event, lineConfig.client493);
};
