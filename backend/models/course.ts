import { model, Schema } from "mongoose";

const coursesSchema = new Schema({
  code: {
    type: String,
    required: [true, "A code is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "A userId is required"],
    unique: true,
  },
  type: {
    type: String,
    required: [true, "A userId is required"],
  },
  startTime: {
    type: String,
    required: [true, "A startTime is required [xx:xx]"],
  },
  hours: {
    type: Number,
    required: [true, "A hours is required"],
  },
  location: {
    latitude: {
      type: Number,
      required: [true, "A latitude is required"],
    },
    longitude: {
      type: Number,
      required: [true, "A longitude is required"],
    },
  },
});

export default model("Course", coursesSchema);
