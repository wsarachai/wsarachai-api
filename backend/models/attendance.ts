import { model, Schema, Types } from "mongoose";

const AttendanceSchema: Schema = new Schema({
  status: {
    type: String,
    required: [true, "A status is required"],
  },
  timeAtten: {
    type: String,
    required: [true, "A timeAtten is required"],
  },
});

export default model("Attendance", AttendanceSchema);
