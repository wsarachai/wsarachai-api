
const fs = require('fs');

exports.info = (req, res) => {
  //console.log(req.body);
  //console.log(req.query);
  //res.status(200).send('Hello, this message from line.');
  const textIn = fs.readFileSync(`${__dirname}/line.html`, 'utf-8');
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(textIn);
};
