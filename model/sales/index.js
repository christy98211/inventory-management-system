const mongoose = require('mongoose');

const { Schema } = mongoose;
const Sales = new Schema({
    code: { 
        type: String,
    },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'customers',
    },
    customer_name: {
        type: Schema.Types.ObjectId,
        ref: 'customers',
    },
    item_name: {
        type: Schema.Types.ObjectId,
        ref: 'items',
    },
    item_quantity:{
        type: Number,
    },
    bill_amount: { 
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

const sales = mongoose.model('sales', Sales, 'sales');
module.exports = sales;
