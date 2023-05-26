const lineConfig = require("../utils/lineConfig");
const textMessage = require("./lineAction");
const studentService = require("../services/studentService");

const handleEvent = async (event, client) => {
  //console.log(client);
  console.log(event);

  // Accept only text messages at this time
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  // Get Student by Line account Id
  const student = await studentService.findByLineId({ lineId: event.source.userId });
  if (student) {
    if (event.message.text.toLowerCase().slice(0, 3) === "reg") {
      // The student type the "reg:xxxxxxxxxx" again, notify the message to them
      client.pushMessage(event.source.userId, {
        type: "text",
        text: `นักศึกษาได้ลงทะเบียนแล้ว`
      });
      textMessage.message(event, client, "user");
    }
    // The student is typed commands, the process it
    else if (event.message.type === "text") {
      textMessage.message(event, client, event.message.text.toLowerCase());
    }
  }
  // The student is typed the command 'reg:xxxxxxxxxx' and let them start registration
  else if (event.message.text.toLowerCase().slice(0, 3) === "reg") {
    textMessage.message(event, client, event.message.text.toLowerCase());
  }
  // The student is not register
  else {
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
