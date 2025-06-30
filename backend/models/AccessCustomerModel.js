const mongoose = require('mongoose');
const crypto = require('crypto');

const accessRestaurantSchema = new mongoose.Schema({
    mailID: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    CompanyName: { type: String, required: true },
    room: { type: String, unique: true, required: true, default: () => crypto.randomBytes(6).toString('hex') },
    pan: { type: String, required: true, unique: true },
    tan: { type: String, required: true, unique: true },
    gst: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
}, {
    collection: 'AccessRestaurants'
});

const accessRestaurantModel = mongoose.model('AccessRestaurants', accessRestaurantSchema);
module.exports = accessRestaurantModel;
