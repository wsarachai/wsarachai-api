import { model, Schema, Document } from "mongoose";

const usersSchema: Schema = new Schema({
  lineId: {
    type: String,
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
