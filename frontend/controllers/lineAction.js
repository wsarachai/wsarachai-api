const https = require("https");
const studentService = require("../services/studentService");
const AIMLInterpreter = require("./AIMLInterpreter");

const aimlInterpreter = new AIMLInterpreter({
  name: "WireInterpreter",
  age: "47",
});

aimlInterpreter.loadAIMLFilesIntoArray(["./test-aiml.xml"]);

const needRegister = (event, client) => {
  const cmds = event.message.text.split(":");
  const studentId = cmds[1];

  if (event.source.type === "user") {
    let userId = event.source.userId;

    studentService
      .findOne({ studentId: studentId })
      .then((user) => {
        console.log(user);
        if (user.lineId) {
          console.log("User found:", user);
          client.pushMessage(userId, {
            type: "text",
            text: `สวัสดี, ${user.studentId}-${user.firstName} ${user.lastName}`,
          });
        } else {
          //
          const url = "api.line.me";
          const reqUrl = `https://itsci.mju.ac.th/watcharin/student/register?userId=${userId}&studentId=${user.studentId}&_id=${user._id}`;

          console.log(reqUrl);

          var postData = JSON.stringify({
            to: userId,
            messages: [
              {
                type: "template",
                altText: "Account Link",
                template: {
                  type: "buttons",
                  text: "ลงทะเบียนนักศึกษาใหม่",
                  actions: [
                    {
                      type: "uri",
                      label: "คลิกที่นี่",
                      uri: reqUrl,
                    },
                  ],
                },
              },
            ],
          });
          var options = {
            hostname: url,
            port: 443,
            path: "/v2/bot/message/push",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(postData),
              Authorization: `Bearer ${client.config.channelAccessToken}`,
            },
          };

          let req = https.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
              console.log(`BODY: ${chunk}`);
            });
            res.on("end", () => {
              console.log("No more data in response.");
            });
          });

          req.on("error", (e) => {
            console.log(`problem with request: ${e.message}`);
          });
          // write data to request body
          req.write(postData);
          req.end();
        }
      })
      .catch((error) => {
        console.error("Error occurred while finding user:", error);
      });
  } else {
    client.replyMessage(event.replyToken, {
      type: "text",
      text: "You are not a User!",
    });
  }
};

const getInfo = (event, client) => {
  if (event.source.type === "user") {
    let lineId = event.source.userId;

    studentService
      .findLineId({ userId: lineId })
      .then((user) => {
        if (user) {
          console.log("User found:", user);
          client.pushMessage(userId, {
            type: "text",
            text: `สวัสดี, ${user.studentId}-${user.firstName} ${user.lastName}`,
          });
        } else {
          //
          const url = "api.line.me";
          var postData = JSON.stringify({
            to: userId,
            messages: [
              {
                type: "template",
                altText: "Account Link",
                template: {
                  type: "buttons",
                  text: "ลงทะเบียนนักศึกษาใหม่",
                  actions: [
                    {
                      type: "uri",
                      label: "คลิกที่นี่",
                      uri: `https://itsci.mju.ac.th/watcharin/student/register?userId=${userId}&studentId=${user.studentId}&firstName=${user.firstName}&lastName=${user.lastName}`,
                    },
                  ],
                },
              },
            ],
          });
          var options = {
            hostname: url,
            port: 443,
            path: "/v2/bot/message/push",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(postData),
              Authorization: `Bearer ${client.config.channelAccessToken}`,
            },
          };

          let req = https.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
              console.log(`BODY: ${chunk}`);
            });
            res.on("end", () => {
              console.log("No more data in response.");
            });
          });

          req.on("error", (e) => {
            console.log(`problem with request: ${e.message}`);
          });
          // write data to request body
          req.write(postData);
          req.end();
        }
      })
      .catch((error) => {
        console.error("Error occurred while finding user:", error);
      });
  } else {
    client.replyMessage(event.replyToken, {
      type: "text",
      text: "You are not a User!",
    });
  }
};

const sayBye = (event, client) => {
  if (event.source.type === "user") {
    client.leaveRoom(event.source.roomId);
  } else if (event.source.type === "group") {
    client.leaveGroup(event.source.groupId);
  } else {
    client
      .replyMessage(event.replyToken, {
        type: "text",
        text: "I cannot leave a 1-on-1 chat!",
      })
      .catch((err) => {
        if (err instanceof HTTPError) {
          console.error(err.statusCode);
        }
      });
  }
};

const sayHi = () => {
  if (event.source.type === "user") {
    let userId = event.source.userId;
    client.getProfile(userId).then((profile) => {
      console.log(profile);
      client.pushMessage(userId, {
        type: "text",
        text: `hello, ${profile.displayName}`,
      });
    });
  } else {
    client
      .replyMessage(event.replyToken, {
        type: "text",
        text: "Hi, noname",
      })
      .catch((err) => {
        if (err instanceof HTTPError) {
          console.error(err.statusCode);
        }
      });
  }
};

const checkValidUser = async (event, client) => {
  if (event.source.type === "user") {
    let userId = event.source.userId;

    const student = await studentService.findByLineId({ userId: userId });

    studentService
      .findByStudentId({ studentId: student.studentId })
      .then((user) => {
        if (user) {
          console.log("User found:", user);
          client.pushMessage(userId, {
            type: "text",
            text: `สวัสดี, ${user.code}-${user.firstName} ${user.lastName}`,
          });
        } else {
          console.log("User not found");
          client.pushMessage(userId, {
            type: "text",
            text: `นักศึกษายังไม่ได้ลงทะเบียนกับ Line ให้พิมพ์ข้อความ "Reg:<รหัสนักศึกษา>" เพื่อลงทะเบียนก่อน `,
          });
        }
      })
      .catch((error) => {
        console.error("Error occurred while finding user:", error);
      });
  }
};

const attenStudent = (event, client) => {
  if (event.source.type === "user") {
    let userId = event.source.userId;

    studentService
      .findOne({ userId: userId })
      .then((user) => {
        if (user) {
          const url = "api.line.me";
          var postData = JSON.stringify({
            to: userId,
            messages: [
              {
                type: "template",
                altText: "Account Link",
                template: {
                  type: "buttons",
                  text: "ลงชื่อเข้าเรียน",
                  actions: [
                    {
                      type: "uri",
                      label: "คลิกที่นี่",
                      uri: `https://itsci.mju.ac.th/watcharin/student/atten?userId=${userId}&course=${client.config.course}`,
                    },
                  ],
                },
              },
            ],
          });
          var options = {
            hostname: url,
            port: 443,
            path: "/v2/bot/message/push",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(postData),
              Authorization: `Bearer ${client.config.channelAccessToken}`,
            },
          };

          let req = https.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
              console.log(`BODY: ${chunk}`);
            });
            res.on("end", () => {
              console.log("No more data in response.");
            });
          });

          req.on("error", (e) => {
            console.log(`problem with request: ${e.message}`);
          });
          // write data to request body
          req.write(postData);
          req.end();
        }
      })
      .catch((error) => {
        console.error("Error occurred while finding user:", error);
      });
  } else {
    client.replyMessage(event.replyToken, {
      type: "text",
      text: "You are not a User!",
    });
  }
};

const getMessageContent = (event, client) => {
  client.getMessageContent("455505364492661649").then((stream) => {
    stream.on("data", (chunk) => {});
    stream.on("error", (err) => {
      console.error(err.statusCode);
    });
    stream.pipe();
  });
};

const getLineUserProfile = (event, client) => {
  if (event.source.type === "user") {
    let userId = event.source.userId;
    client.getProfile(userId).then((profile) => {
      client.pushMessage(userId, {
        type: "text",
        text: JSON.stringify(profile),
      });
    });
  }
};

const talkToAimlInterpreter = (event, client) => {
  return aimlInterpreter.findAnswerInLoadedAIMLFiles(
    event.message.text,
    async (answer, wildCardArray, input) => {
      // console.log(answer + ' | ' + wildCardArray + ' | ' + input);
      if (answer === undefined) {
        answer = "I found nothing.";
      }
      await client.replyMessage(event.replyToken, {
        type: "text",
        text: answer,
      });
    }
  );
};

exports.message = (event, client) => {
  if (event.message.text.slice(0, 3) === "Reg") {
    needRegister(event, client);
  } else if (event.message.text === "Info") {
    getInfo(event, client);
  } else if (event.message.text === "Bye") {
    sayBye(event, client);
  } else if (event.message.text === "Hi") {
    sayHi(event, client);
  } else if (event.message.text === "User") {
    checkValidUser(event, client);
  } else if (event.message.text === "atten") {
    attenStudent(event, client);
  } else if (event.message.text === "Msg") {
    getMessageContent(event, client);
  } else if (event.message.text === "Profile") {
    getLineUserProfile(event, client);
  } else {
    return talkToAimlInterpreter(event, client);
  }
};
