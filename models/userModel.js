const mongoose = require('mongoose');
const { Schema } = mongoose;

const userModel = new Schema({
    username: { 
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    password: { 
        type: String,
        minlength: 5,
        required: true
    },
    games: [{
        type: Schema.Types.ObjectId,
        ref: "Game"
    }]
},
{
    timestamps: true
}
);

module.exports = mongoose.model('User', userModel);