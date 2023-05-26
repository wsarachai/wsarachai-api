const lineClient = require('./lineClient');

exports.webHook241 = (req, res) => {
    Promise.all(req.body.events.map(lineClient.handleEvent241))
        .then((result) => res.json(result));
};

exports.webHook493 = (req, res) => {
    Promise.all(req.body.events.map(lineClient.handleEvent493))
        .then((result) => res.json(result));
};

exports.auth = (req, res) => {
    console.log(req.query);
    //res.status(200).send("hello");
    res.redirect('/watcharin/test.html');
};
