//const https = require("https")
const AIMLInterpreter = require('./AIMLInterpreter');
const line = require('@line/bot-sdk');

const aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
aimlInterpreter.loadAIMLFilesIntoArray(['./test-aiml.xml']);

const config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

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
  
exports.webHook = (req, res) => {
    Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
};
