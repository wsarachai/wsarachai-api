const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const userRoute = require('./routes/userRoutes');
const webhookRoute = require('./routes/webhookRoutes');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', userRoute);
app.use('/api/v1/webhook', webhookRoute);

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
