const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
    path: './config.env'
});

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("You successfully connected to MongoDB!");
});

const app = require('./app');

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
