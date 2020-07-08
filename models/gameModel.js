const mongoose = require('mongoose')
const { Schema } = mongoose

const gameModel = new Schema({
    player1: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    player2: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    player1score: {
        type: Number,
        required: true
    },
    player2score: {
        type: Number,
        required: true
    },
    scoreLog: {
        type: Array
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Game', gameModel);