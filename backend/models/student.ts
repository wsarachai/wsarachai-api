import { model, Schema, Types } from "mongoose";
import User from "./user";

const StudentsSchema: Schema = new Schema({
  studentId: {
    type: String,
    required: [true, "A studentId is required"],
    unique: true,
  },
});

export default User.discriminator("Student", StudentsSchema);
