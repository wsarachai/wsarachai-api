import { model, Schema, Types, Document } from "mongoose";

const CoursesSchema: Schema = new Schema({
  subject: {
    type: Types.ObjectId,
    ref: "Subject",
    required: [true, "A subject is required"],
  },
  term: {
    type: Number,
    required: [true, "A term is required"],
  },
  semester: {
    type: Number,
    required: [true, "A term is required"],
  },
});

export default model("Course", CoursesSchema);
