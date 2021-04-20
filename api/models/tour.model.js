const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const constants = require('../constants');
const Guide = require('./guide.model')



const tourSchema = new Schema({
    title: {
        type: String,
        required: 'A title is required.',
        maxLength: [40, 'Max is 40 characters']
    },
    category: [
        {
            type: String,
            enum: constants.CATEGORY,
            required: 'Please, select at least one category'
        }
    ],

    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: void 0,
            required: 'A meeting point is required',
            validate: {
                validator: function ([lng, lat]) {
                    return isFinite(lng) && isFinite(lat) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
                },
                message: props => `Invalid location coordinates`
            }
        }
    },

    price: {
        type: Number,
        required: 'Duration is required.'
    },

    owner: {
        ref: Guide.modelName,
        type: mongoose.Types.ObjectId,
        required: 'Guide is required.'
    },

    start: {
        type: Date,
        required: 'Date is required',
        validate: {
            validator: function (value) {
                return moment().startOf('day').isBefore(moment(value))
            },
            message: props => `Starting must not be in the past`
        }
    },

    duration: {
        type: Number,
        required: 'Duration is required.'
    },

    description: {
        type: String,
        required: 'Please, enter a description for this Tour.'
    },
    image:
        [
            {
                type: String,
                required: 'Please, provide an image from this rote.',
            }

        ],

    comments: {
        type: String
    },

    ratingsTour: {
        type: Number,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    ratingsNumber: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },


}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;