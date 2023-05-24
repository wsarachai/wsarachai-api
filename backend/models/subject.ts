import { model, Schema, Document } from "mongoose";

const SubjectSchema: Schema = new Schema({
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
});

export default model("Subject", SubjectSchema);
