const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {km48UQvYf/VHuvs9SeMBfO3mC9EWjGrFSR8EtBpuj/Ku5mAaCA5N/Hl9rTAvEE5tu4zRN6WTmxQFIHiyDeXqCk6jBer2K2JSrKsCsgmi2zcMMieB6BlkdLH5nEHdVRv6cep+TbriqjbgXK6n7BpuxAdB04t89/1O/w1cDnyilFU=}'
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
}
