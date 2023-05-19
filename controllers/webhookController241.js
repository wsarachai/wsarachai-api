//const https = require("https")
const AIMLInterpreter = require('./AIMLInterpreter');
const line = require('@line/bot-sdk');

const aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
aimlInterpreter.loadAIMLFilesIntoArray(['./test-aiml.xml']);

const config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN241,
    channelSecret: process.env.LINE_CHANNEL_SECRET241
};

const client = new line.Client(config);

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    console.log(event);

    if (event.message.type === 'text') {
        if (event.message.text === 'Bye') {
            if (event.source.type === 'room') {
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
    }
  }
  
exports.webHook = (req, res) => {
    Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
};
