import { model, Schema, Types } from "mongoose";

const AttendanceSchema: Schema = new Schema({
  status: {
    type: String,
    required: [true, "A status is required"],
  },
  student: {
    type: Types.ObjectId,
    ref: "Student",
    required: [true, "A student is required"],
  },
});

export default model("Attendance", AttendanceSchema);
