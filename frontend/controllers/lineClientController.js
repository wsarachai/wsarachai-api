const lineConfig = require("../utils/lineConfig");
const textMessage = require("./lineAction");
const studentService = require("../services/studentService");
const lineITSCI = require("./lineITSCIMessage");

const handleEvent = async (event, client) => {
  //console.log(client);
  console.log(event);

  // Accept only text messages at this time
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  // Get Student by Line account Id
  const student = await studentService.findByLineId(event.source.userId);
  if (student) {
    if (event.message.type === "text") {
      textMessage.message(event, client, event.message.text.toLowerCase());
    }
  }
  // The student is not register
  else {
    client.pushMessage(event.source.userId, {
      type: "text",
      text: `นักศึกษายังไม่ได้ลงทะเบียน"`
    });
  }
};

exports.handleEventITSCI = (event) => {
  lineITSCI.handleEvent(event, lineConfig.clientITSCI);
};

exports.handleEvent241 = (event) => {
  handleEvent(event, lineConfig.client241);
};

exports.handleEvent493 = (event) => {
  handleEvent(event, lineConfig.client493);
};
