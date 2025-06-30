const { ObjectId } = require('mongodb');
const HotelBenchModel = require('../models/hotelBenchModel');
const MenuListModel = require('../models/MenuListModel');
exports.getCasherBilling = async (Socket, io) => {
    Socket.on('joinCasherBilling', async (companyName) => {
        try {
            Socket.join(companyName)
            const menuList = await MenuListModel.find({ companyName: companyName })
            const hotelBench = await HotelBenchModel.find({ companyName: companyName })
            Socket.emit('sendCasherBilling', {
                menuList,
                hotelBench
            });
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('updateCasherBilling', async (docId, newContent, companyName) => {

        const filter = { _id: new ObjectId(docId) };
        const update = { $set: { status: "open", btn_values: newContent } };

        const document = await HotelBenchModel.updateOne(filter, update);
        console.log(document);
        io.to(companyName).emit('documentUpdated', docId, newContent, "open");

    })


}