const mongoose = require('mongoose');

const { Schema } = mongoose;
const Category = new Schema({
    code: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
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

const category = mongoose.model('category', Category, 'category');
module.exports = category;
