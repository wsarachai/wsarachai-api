//const https = require("https")
//const AIMLInterpreter = require('./AIMLInterpreter');
const line = require('@line/bot-sdk');

// const TOKEN = process.env.LINE_ACCESS_TOKEN;
// const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;

// const aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
// aimlInterpreter.loadAIMLFilesIntoArray(['./test-aiml.xml']);

// reply = (reply_token, msg) => {
//     let dataString = JSON.stringify({
//         replyToken: reply_token,
//         messages: [{
//             type: 'text',
//             text: msg
//         }]
//     });

//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer {${TOKEN}}`
//     };

//     const webhookOptions = {
//         "hostname": "api.line.me",
//         "path": "/v2/bot/message/reply",
//         "method": "POST",
//         "headers": headers,
//         "body": dataString
//       };
      
//       // Define request
//       const request = https.request(webhookOptions, (res) => {
//         res.on("data", (d) => {
//             process.stdout.write(d)
//         });
//       });
  
//       // Handle error
//       request.on("error", (err) => {
//         console.error(err)
//       });
  
//       // Send data
//       request.write(dataString);
//       request.end();
// };

const config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};

  
const client = new line.Client(config);

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
  
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });
  }
  
exports.webHook = (req, res) => {
    Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
};

// exports.webHook = (req, res) => {
//     res.send("HTTP POST request sent to the webhook URL!");
//     if (req.body.events[0].type === "message") {
//         let reply_token = req.body.events[0].replyToken;
//         let msg = req.body.events[0].message.text;

//         aimlInterpreter.findAnswerInLoadedAIMLFiles(msg, (answer, wildCardArray, input) => {
//             console.log(answer + ' | ' + wildCardArray + ' | ' + input);
//             reply(reply_token, answer);
//         });
//     }
// };
