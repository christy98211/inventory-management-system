const mongoose = require('mongoose');
const currentDate = new Date();
const offset = currentDate.getTimezoneOffset();
const { Schema } = mongoose;
const Customers = new Schema({
    code: {
        type: String,
        unique: true,
    },
    customer_id: {
        type: String,
    },
    customer_name: {
        type: String,
    },
    address: {
        type: String,
        
    },
    contact: {
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
    offset: {
        type: Number,
        default: offset
    },

}, {
    toJSON: {
        virtuals: true,
    },
});

const customers = mongoose.model('customers', Customers, 'customers');
module.exports = customers;
