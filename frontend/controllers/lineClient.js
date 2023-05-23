const https = require("https")
const AIMLInterpreter = require('./AIMLInterpreter');
const lineConfig = require('./../utils/lineConfig');
const studentService = require('../services/studentService');

const aimlInterpreter = new AIMLInterpreter({ name: 'WireInterpreter', age: '42' });
aimlInterpreter.loadAIMLFilesIntoArray(['./test-aiml.xml']);


const textMessage = (event, client) => {

  if (event.message.text.slice(0, 3) === 'Reg') {
    const cmds = event.message.text.split(':');
    const studentId = cmds[1];

    if (event.source.type === 'user') {
      let userId = event.source.userId;

      studentService.findOne({ studentId: studentId }).then(user => {
        console.log(user);
        if (user.lineId) {
          console.log('User found:', user);
          client.pushMessage(userId, {
            type: 'text',
            text: `สวัสดี, ${user.studentId}-${user.firstName} ${user.lastName}`,
          });
        } else {
          //
          const url = 'api.line.me';
          var postData = JSON.stringify({
            "to": userId,
            "messages": [{
              "type": "template",
              "altText": "Account Link",
              "template": {
                "type": "buttons",
                "text": "ลงทะเบียนนักศึกษาใหม่",
                "actions": [{
                  "type": "uri",
                  "label": "คลิกที่นี่",
                  "uri": `https://itsci.mju.ac.th/watcharin/student/register?userId=${userId}&studentId=${user.studentId}&firstName=${user.firstName}&lastName=${user.lastName}`
                }]
              }
            }]
          });
          var options = {
            hostname: url,
            port: 443,
            path: '/v2/bot/message/push',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData),
              'Authorization': `Bearer ${client.config.channelAccessToken}`
            }
          };

          let req = https.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
              console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
              console.log('No more data in response.');
            });
          });

          req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
          });
          // write data to request body
          req.write(postData);
          req.end();
        }
      })
        .catch(error => {
          console.error('Error occurred while finding user:', error);
        });
    }
    else {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'You are not a User!'
      })
    }
  }
  else if (event.message.text === 'Info') {
    if (event.source.type === 'user') {
      let lineId = event.source.userId;

      studentService.findLineId({ userId: lineId }).then(user => {
        if (user) {
          console.log('User found:', user);
          client.pushMessage(userId, {
            type: 'text',
            text: `สวัสดี, ${user.studentId}-${user.firstName} ${user.lastName}`,
          });
        } else {
          //
          const url = 'api.line.me';
          var postData = JSON.stringify({
            "to": userId,
            "messages": [{
              "type": "template",
              "altText": "Account Link",
              "template": {
                "type": "buttons",
                "text": "ลงทะเบียนนักศึกษาใหม่",
                "actions": [{
                  "type": "uri",
                  "label": "คลิกที่นี่",
                  "uri": `https://itsci.mju.ac.th/watcharin/student/register?userId=${userId}&studentId=${user.studentId}&firstName=${user.firstName}&lastName=${user.lastName}`
                }]
              }
            }]
          });
          var options = {
            hostname: url,
            port: 443,
            path: '/v2/bot/message/push',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData),
              'Authorization': `Bearer ${client.config.channelAccessToken}`
            }
          };

          let req = https.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
              console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
              console.log('No more data in response.');
            });
          });

          req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
          });
          // write data to request body
          req.write(postData);
          req.end();
        }
      })
        .catch(error => {
          console.error('Error occurred while finding user:', error);
        });
    }
    else {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'You are not a User!'
      })
    }
  }
  else if (event.message.text === 'Bye') {
    if (event.source.type === 'user') {
      client.leaveRoom(event.source.roomId);
    } else if (event.source.type === 'group') {
      client.leaveGroup(event.source.groupId);
    } else {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'I cannot leave a 1-on-1 chat!',
      }).catch((err) => {
        if (err instanceof HTTPError) {
          console.error(err.statusCode);
        }
      });
    }
  }
  else if (event.message.text === 'Hi') {
    if (event.source.type === 'user') {
      let userId = event.source.userId;
      client.getProfile(userId).then((profile) => {
        console.log(profile);
        client.pushMessage(userId, {
          type: 'text',
          text: `hello, ${profile.displayName}`,
        });
      });
    } else {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Hi, noname',
      }).catch((err) => {
        if (err instanceof HTTPError) {
          console.error(err.statusCode);
        }
      });
    }
  }
  else if (event.message.text === 'User') {
    if (event.source.type === 'user') {
      let userId = event.source.userId;
      studentService.findOne({ userId: userId }).then(user => {
        if (user) {
          console.log('User found:', user);
          client.pushMessage(userId, {
            type: 'text',
            text: `สวัสดี, ${user.code}-${user.firstName} ${user.lastName}`,
          });
        } else {
          console.log('User not found');
        }
      })
        .catch(error => {
          console.error('Error occurred while finding user:', error);
        });
    }
  }
  else if (event.message.text === 'atten') {
    if (event.source.type === 'user') {
      let userId = event.source.userId;

      studentService.findOne({ userId: userId }).then(user => {
        if (user) {
          const url = 'api.line.me';
          var postData = JSON.stringify({
            "to": userId,
            "messages": [{
              "type": "template",
              "altText": "Account Link",
              "template": {
                "type": "buttons",
                "text": "ลงชื่อเข้าเรียน",
                "actions": [{
                  "type": "uri",
                  "label": "คลิกที่นี่",
                  "uri": `https://itsci.mju.ac.th/watcharin/student/atten?userId=${userId}&course=${client.config.course}`
                }]
              }
            }]
          });
          var options = {
            hostname: url,
            port: 443,
            path: '/v2/bot/message/push',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData),
              'Authorization': `Bearer ${client.config.channelAccessToken}`
            }
          };

          let req = https.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
              console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
              console.log('No more data in response.');
            });
          });

          req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
          });
          // write data to request body
          req.write(postData);
          req.end();
        }
      })
        .catch(error => {
          console.error('Error occurred while finding user:', error);
        });
    }
    else {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'You are not a User!'
      })
    }
  }
  // else if (event.message.text === 'Msg') {
  //     client.getMessageContent('455505364492661649')
  //     .then((stream) => {
  //         stream.on('data', (chunk) => {

  //         });
  //         stream.on('error', (err) => {
  //             console.error(err.statusCode);
  //         });
  //         stream.pipe();
  //     })
  // }
  else if (event.message.text === 'Profile') {
    if (event.source.type === 'user') {
      let userId = event.source.userId;
      client.getProfile(userId).then((profile) => {
        client.pushMessage(userId, {
          type: 'text',
          text: JSON.stringify(profile),
        });
      });
    }
  } else {
    return aimlInterpreter.findAnswerInLoadedAIMLFiles(event.message.text, async (answer, wildCardArray, input) => {
      // console.log(answer + ' | ' + wildCardArray + ' | ' + input);
      if (answer === undefined) {
        answer = "I found nothing.";
      }
      await client.replyMessage(event.replyToken, {
        type: 'text',
        text: answer
      })
    });
  }
};


const handleEvent = (event, client) => {

  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  console.log(client);
  console.log(event);

  if (event.message.type === 'text') {
    textMessage(event, client);
  }
}

exports.handleEvent241 = (event) => {
  handleEvent(event, lineConfig.client241);
};

exports.handleEvent493 = (event) => {
  handleEvent(event, lineConfig.client493);
};
