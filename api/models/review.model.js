const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    description: {
        type: String,
        minlength: [5, 'Min review is 5 characters']
    },
    rating: {
        type: Number,
        required: 'Rating is required.',
        min: 0,
        max: 5
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        required: 'Review must belong to a route.'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: 'Review must belong to a guide'
    },

    guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guide',
        require: 'Review must belong to a guide'
    },



}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            ret.id = doc._id;
            return ret;
        }
    }

});



const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;