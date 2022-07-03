const mongoose = require('mongoose');
const currentDate = new Date();
const offset = currentDate.getTimezoneOffset();
const { Schema } = mongoose;
const Items = new Schema({
    code: {
        type: String,
        unique: true,
    },
    product_id: {
        type: String,
    },
    product_name: {
        type: String,
    },
    product_category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
    },
    rate: {
        type: String,
        
    },
    quantity: {
        type: Number,

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

const items = mongoose.model('items', Items, 'items');
module.exports = items;
