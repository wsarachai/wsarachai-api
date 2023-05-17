const request = require('request');
const TOKEN = process.env.LINE_ACCESS_TOKEN;

reply = (reply_token) => {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer {${TOKEN}}`
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
};

exports.webHook = (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
};
