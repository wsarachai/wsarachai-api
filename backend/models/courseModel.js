const mongoose = require("mongoose");

const coursesSchema = mongoose.Schema({
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

const Course = mongoose.model("Course", coursesSchema);

module.exports = Course;
