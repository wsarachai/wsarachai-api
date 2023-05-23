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
});

export default model("Register", RegisterSchema);
