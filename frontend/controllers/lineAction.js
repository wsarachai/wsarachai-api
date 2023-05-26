const https = require("https");
const studentService = require("../services/studentService");

const needRegister = (event, client, studentId) => {
  if (event.source.type === "user") {
    let userId = event.source.userId;

    studentService
      .findByStudentId({ studentId: studentId })
      .then((user) => {
        console.log(user);
        if (user) {
          if (user.lineId) {
            console.log("User found:", user);
            client.pushMessage(userId, {
              type: "text",
              text: `สวัสดี, ${user.firstName} ${user.lastName} รหัสนักศึกษา ${user.studentId}`,
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
        } else {
          client.pushMessage(userId, {
            type: "text",
            text: `รหัสนักศึกษานี้ไม่มีอยู่ในระบบให้ติดต่ออาจารย์`,
          });
        }
      })
      .catch((error) => {
        console.error("Error occurred while finding user:", error);
      });
  } else {
    client.pushMessage(userId, {
      type: "text",
      text: "ไม่สามารถค้นหาข้อมูลนักศึกษา!",
    });
  }
};

const getLineUserProfile = (event, client) => {
  if (event.source.type === "user") {
    let lineId = event.source.userId;

    studentService
      .findByLineId({ lineId: lineId })
      .then((user) => {
        if (user) {
          client.pushMessage(lineId, {
            type: "text",
            text: `คำสั่งนี้ใช้สำหรับแก้ไขข้อมูลนักศึกษา ในขณะนี้ยังไม่สามารถดำเนินการได้`,
          });
        }
      })
      .catch((error) => {
        console.error("Error occurred while finding user:", error);
      });
  } else {
    client.pushMessage(userId, {
      type: "text",
      text: "ไม่สามารถค้นหาข้อมูลนักศึกษา!",
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
      }).catch((err) => {
        if (err instanceof HTTPError) {
          console.error(err.statusCode);
        }
      });
  }
};

const sayHi = (event, client) => {
  if (event.source.type === "user") {
    let userId = event.source.userId;
    client.getProfile(userId).then((profile) => {
      console.log(profile);
      client.pushMessage(userId, {
        type: "text",
        text: `สวัสดี, ${profile.displayName}`,
      });
    });
  } else {
    client.pushMessage(userId, {
      type: "text",
      text: "Hi, noname",
    }).catch((err) => {
      if (err instanceof HTTPError) {
        console.error(err.statusCode);
      }
    });
  }
};

const checkValidUser = async (event, client) => {
  if (event.source.type === "user") {
    let lineId = event.source.userId;
    const student = await studentService.findByLineId({ lineId: lineId });

    if (student) {
      console.log("User found:", student);
      client.pushMessage(lineId, {
        type: "text",
        text: `สวัสดี, ${student.firstName} ${student.lastName} รหัสนักศึกษา ${student.studentId}`,
      });
    } else {
      console.log("User not found");
      client.pushMessage(lineId, {
        type: "text",
        text: `นักศึกษายังไม่ได้ลงทะเบียนกับ Line ให้พิมพ์ข้อความ "Reg:<รหัสนักศึกษา>" เพื่อลงทะเบียนก่อน `,
      });
    }
  }
};

// The process to atten the students
const attenStudent = (event, client) => {
  if (event.source.type === "user") {
    let userId = event.source.userId;

    // Find the student by Line Id, we will get the student Id
    // from the database.
    studentService
      .findOne({ userId: userId })
      .then((user) => {
        if (user) {
          // We get the student, let create the panel button option for the student
          // can click to begin the attenuation process
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
  }
};

const getMessageContent = (event, client) => {
  client.getMessageContent("455505364492661649").then((stream) => {
    stream.on("data", (chunk) => { });
    stream.on("error", (err) => {
      console.error(err.statusCode);
    });
    stream.pipe();
  });
};

const getInfo = (event, client) => {
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

exports.message = async (event, client, text) => {
  let lineId = event.source.userId;
  const student = await studentService.findByLineId({ lineId: lineId });

  if (student) {
    text = text.trim();
    if (text === "profile") {
      getLineUserProfile(event, client);
    } else if (text === "user") {
      checkValidUser(event, client);
    } else if (text === "hi") {
      sayHi(event, client);
    }
    else if (text === "atten") {
      attenStudent(event, client);
    }
    // else if (text === "bye") {
    //   sayBye(event, client);
    // } 
    // else if (text === "msg") {
    //   getMessageContent(event, client);
    // } 
    // else if (text === "info") {
    //   getInfo(event, client);
    // } 
    else {
      client.pushMessage(event.source.userId, {
        type: "text",
        text: `คำสั่งนี้ไม่สามารถดำเนินการได้ กรุณาใช้คำสั่งดังต่อไปนี้ [Hi,User,Profile,atten]`
      });
      // client.replyMessage(event.replyToken, {
      //   type: "text",
      //   text: "You are not a User!",
      // });
    }
  } else {
    if (text.slice(0, 3) === "reg") {
      const cmds = text.split(":");
      const studentId = cmds[1];
      if (studentId && studentId.length == 10) {
        needRegister(event, client, studentId);
      } else {
        client.pushMessage(event.source.userId, {
          type: "text",
          text: `รูปแบบการลงทะเบียนไม่ถูกต้องให้พิมพ์ข้อความ "Reg:<รหัสนักศึกษา>"`
        });
      }
    } else {
      client.pushMessage(event.source.userId, {
        type: "text",
        text: `ยังไม่ได้ลงทะเบียนให้พิมพ์ข้อความ "Reg:<รหัสนักศึกษา>" เพื่อลงทะเบียนก่อน`
      });
    }
  }
};
