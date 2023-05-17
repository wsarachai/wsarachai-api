const https = require("https")
const AIMLInterpreter = require('./AMILI');
const TOKEN = process.env.LINE_ACCESS_TOKEN;

const aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
aimlInterpreter.loadAIMLFilesIntoArray(['./test-aiml.xml']);

//const aimlParser = new AIMLParser({ name:'HelloBot' });
//aimlParser.load(['./test-aiml.xml']);

reply = (reply_token, msg) => {
    let dataString = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    });

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer {${TOKEN}}`
    };

    const webhookOptions = {
        "hostname": "api.line.me",
        "path": "/v2/bot/message/reply",
        "method": "POST",
        "headers": headers,
        "body": dataString
      };
      
      // Define request
      const request = https.request(webhookOptions, (res) => {
        res.on("data", (d) => {
            process.stdout.write(d)
        });
      });
  
      // Handle error
      request.on("error", (err) => {
        console.error(err)
      });
  
      // Send data
      request.write(dataString);
      request.end();
};

exports.webHook = (req, res) => {
    res.send("HTTP POST request sent to the webhook URL!");
    if (req.body.events[0].type === "message") {
        let reply_token = req.body.events[0].replyToken;
        let msg = req.body.events[0].message.text;

        aimlInterpreter.findAnswerInLoadedAIMLFiles(msg, (answer, wildCardArray, input) => {
            console.log(answer + ' | ' + wildCardArray + ' | ' + input);
            reply(reply_token, answer);
        });
    }
};
