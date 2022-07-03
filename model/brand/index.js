const mongoose = require('mongoose');
const currentDate = new Date();
const offset = currentDate.getTimezoneOffset();
const { Schema } = mongoose;
const Brand = new Schema({
    code: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        unique: true,
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
    offset: {
        type: Number,
        default: offset
    },

}, {
    toJSON: {
        virtuals: true,
    },
});

const brand = mongoose.model('brand', Brand, 'brand');
module.exports = brand;
