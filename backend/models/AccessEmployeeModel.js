const mongoose = require('mongoose');

const accessEmployeeSchema = new mongoose.Schema({
    userName: { type: String, required: true, trim: true }, // Added 'trim' to remove extra spaces
    mailID: { type: String, required: true, unique: true, lowercase: true }, // Ensure unique email and lowercase
    phone: { type: String, required: true, unique: true }, // Ensure unique phone numbers
    password: { type: String, required: true }, // Consider hashing the password for security
    employeeType: { type: String, required: true },
    companyName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, {
    collection: 'AccessEmployees'
})

const accessEmployeeModel = mongoose.model('AccessEmployees', accessEmployeeSchema);
module.exports = accessEmployeeModel;