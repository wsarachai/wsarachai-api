// const app = require('./app');

import { connect } from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const DB: string = process.env.DATABASE as string;
//connect(DB, {
//  nuseUnifiedTopology: true
//}).then(() => {
//  console.log("You successfully connected to MongoDB!");
//});

await connect(DB!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        //poolSize: parseInt(process.env.POOL_SIZE!),
      } as ConnectOptions)
      .then((res) => {
        console.log(
          'Connected to Distribution API Database - Initial Connection'
        );
      })
      .catch((err) => {
        console.log(
          `Initial Distribution API Database connection error occured -`,
          err
        );
      });

const port: string = process.env.PORT as string;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
