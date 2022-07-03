const mongoose = require('mongoose');

const { Schema } = mongoose;
const Location = new Schema({
    code: {
        type: String,
        unique: true,
    },
    city: {
        type: String,
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'state',
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'country',
    },
    description: {
        type: String,
    },
    is_active: {
        type: Boolean,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'users',

    },
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        default: new Date(),
    },

}, {
    toJSON: {
        virtuals: true,
    },
});

const location = mongoose.model('location', Location, 'location');
module.exports = location;
