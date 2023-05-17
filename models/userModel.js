const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  firstName: {
      type: String,
      required: [true, 'A username is required'],
      unique: true,
  },
  lastName: {
      type: String,
      required: [true, 'A lastname is required'],
  },
    lastName: {
      type: String,
      required: [true, 'A lastname is required'],
  },
  age: { type: Number, default: 0 }
});

const User = mongoose.model('User', usersSchema);

module.exports = User;



// const testUser = new User({
//   firstName: 'Watcharin',
//   lastName: 'Sarachai',
//   age: 48,
// });

// testUser.save()
// .then(doc => {
//   console.log(doc);
// }).catch(err => console.log('Error!!', err));