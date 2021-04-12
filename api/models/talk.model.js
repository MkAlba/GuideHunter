const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const talkSchema = new Schema({

    token: {
        type: String,
    },


    name: {
        type: String,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guide'
    },

    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour'
    },

 }, { timestamps: true }
);

const Talk = mongoose.model('Talk', talkSchema);

module.exports = Talk;
