const mongoose = require('mongoose');

const MenuListSchema = new mongoose.Schema({
    menuItem: { type: String, required: true },
    companyName: { type: String, required: true },
    price:{ type: Number, required: true },
}, {
    collection: 'MenuList'
})

const MenuListModel = mongoose.model('MenuList', MenuListSchema);
module.exports = MenuListModel;