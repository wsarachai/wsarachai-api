
const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./router/userRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', userRoute);

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(404).json({
      status: 'failed',
      message: err.signature,
    });
    return
  } else if (err instanceof JSONParseError) {
    res.status(404).json({
      status: 'failed',
      message: err.raw,
    });
    return
  }
  next(err) // will throw default 500
})

module.exports = app;