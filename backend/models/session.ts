import { model, Schema, Types } from "mongoose";

const SessionSchema: Schema = new Schema({
  sectionNumber: {
    type: Number,
    required: [true, "A sectionNumber is required"],
  },
  course: {
    type: Types.ObjectId,
    ref: "Course",
    required: [true, "A course is required"],
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

export default model("Session", SessionSchema);
