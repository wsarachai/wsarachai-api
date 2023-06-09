import { model, Schema, Types } from "mongoose";

const RegisterSchema: Schema = new Schema({
  student: {
    type: Types.ObjectId,
    ref: "Student",
    required: [true, "A student is required"],
  },
  session: {
    type: Types.ObjectId,
    ref: "Sessioin",
    required: [true, "A session is required"],
  },
  attendances: [
    {
      type: Types.ObjectId,
      ref: "Attendance",
    },
  ],
  midTermScore: {
    type: Number,
    defaultValue: 0,
  },
  finalScore: {
    type: Number,
    defaultValue: 0,
  },
  projectScore: {
    type: Number,
    defaultValue: 0,
  },
  grade: {
    type: String,
    defaultValue: "",
  },
});

export default model("Register", RegisterSchema);
