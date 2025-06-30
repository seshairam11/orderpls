const mongoose = require('mongoose');
const crypto = require('crypto');

const accessHotelSchema = new mongoose.Schema({
    mailID: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    userName: { type: String, required: false },
    pan: { type: String, required: true, unique: true },
    tan: { type: String, required: true, unique: true },
    gst: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
}, {
    collection: 'AccessHotels'
});

const accessHotelModel = mongoose.model('AccessHotels', accessHotelSchema);
module.exports = accessHotelModel;
