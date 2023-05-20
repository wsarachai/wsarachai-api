
const fs = require('fs');

exports.info = (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.status(200).send('Hello, this message from line.');
};
