const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Enter the Name']
    },

    Email: {
        type: String,
        required: [true, 'Enter the Email'],
        unique: true
    },

    Age: {
        type: Number,
        required: [true, 'Enter the Age']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model("users", UsersSchema);
module.exports = UserModel;