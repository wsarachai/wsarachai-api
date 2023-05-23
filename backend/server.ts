// const app = require('./app');

import { connect } from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const DB: string = process.env.DATABASE as string;
connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log("You successfully connected to MongoDB!");
});

const port: string = process.env.PORT as string;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
