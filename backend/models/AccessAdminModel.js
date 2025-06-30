const mongoose = require('mongoose');

const accessAdminSchema = new mongoose.Schema({
    userName: String,
    mailID: String,
    phone: Number,
    password: String,
    createdAt: Date,
}, {
    collection: 'AccessAdmins'
})

const accessAdminModel = mongoose.model('AccessAdmins', accessAdminSchema);
module.exports = accessAdminModel;