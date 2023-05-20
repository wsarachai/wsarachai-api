const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  code: {
      type: String,
      required: [true, 'A code is required'],
      unique: true,
  },
  userId: {
      type: String,
      required: [true, 'A userId is required'],
      unique: true,
  },
  firstName: {
      type: String,
      //required: [true, 'A username is required'],
      //unique: true,
  },
  lastName: {
      type: String,
      //required: [true, 'A lastname is required'],
  },
  nickname: {
      type: String,
      //required: [true, 'A Nick is required'],
  },
  age: { type: Number, default: 0 }
});

const User = mongoose.model('User', usersSchema);

module.exports = User;
