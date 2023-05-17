const dotenv = require('dotenv');
const mongoose = require('mongoose');
const line = require('@line/bot-sdk');

dotenv.config({
    path: './config.env'
});

const app = require('./app');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("You successfully connected to MongoDB!");
});

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
