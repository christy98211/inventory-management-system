const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
    code: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'location',
    },
    password: {
        type: String,
    },
    role_id: {
        type: Schema.Types.ObjectId,
        ref: 'role',    },
    role_code: {
        type: String,
    },
    product_category: [{
        type: Schema.Types.ObjectId,
        ref: 'category',
    }],
    gender: {
        type: String,
    },
    phone_number: {
        type: String,
        unique: true,
    },
    user_info: {
        type: String,
    },
    x_acess_token: {
        type: String,
    },
    user_token_unique_id: {
        type: String,
    },
    device_id: {
        type: String,
    },
    browser_version: {
        type: String,
    },
    device_type: {
        type: String,
    },
    device_name: {
        type: String,
    },
    device_model: {
        type: String,
    },
    os: {
        type: String,
    },
    os_version: {
        type: String,
    },
    is_active: {
        type: Boolean,
    },
    created_by: {
        type: Object,
    },
    updated_by: {
        type: Object,
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
    },

}, {
    toJSON: {
        virtuals: true,
    },
});

User.virtual('role', {
    ref: 'role',
    localField: 'role_code',
    foreignField: 'code',
});

const user = mongoose.model('users', User, 'users');

module.exports = user;
