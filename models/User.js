const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // cart: {
    //     products: [
    //         {
    //           productId: Number,
    //           quantity: Number,
    //           name: String,
    //           price: Number
    //         }
    //     ],
    //     modifiedOn: {
    //         type: Date,
    //         default: Date.now
    //     }
    // }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;