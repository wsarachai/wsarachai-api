const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = mongoose.Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     required: [true, 'A user is required'],
    //     ref: "user",
    // },
    course: {
        type: Schema.Types.ObjectId,
        required: [true, 'A curse is required'],
        ref: "couorse",
    },
    status: {
        type: String,
        required: [true, 'A status is required'],
        unique: true,
    },
    attenType: {
        type: String,
        required: [true, 'A attenType is required'],
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
