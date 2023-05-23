import { model, Schema, Document } from "mongoose";

const usersSchema: Schema = new Schema({
  code: {
    type: String,
    required: [true, "A code is required"],
    unique: true,
  },
  userId: {
    type: String,
    required: [true, "A userId is required"],
    unique: true,
  },
  firstName: {
    type: String,
    //required: [true, 'A username is required'],
    //unique: true,
  },
  lastName: {
    type: String,
    //required: [true, 'A lastname is required'],
  },
  nickname: {
    type: String,
    //required: [true, 'A Nick is required'],
  },
});

export default model("User", usersSchema);
