const { ObjectId } = require('mongodb');
const HotelBenchModel = require('../models/hotelBenchModel')
const MenuListModel = require('../models/MenuListModel')
exports.getServerOrderCompleted = async (Socket, io) => {
    Socket.on('joinServerOrderCompleted', async (companyName) => {
        try {
            Socket.join(companyName)
            const menuList = await MenuListModel.find({ companyName: companyName })
            const hotelBench = await HotelBenchModel.find({ companyName: companyName })
            Socket.emit('sendServerOrderCompleted', {
                menuList,
                hotelBench
            });
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('updateServerOrderCompleted', async (docId, newContent, companyName) => {

        console.log(docId,"fddf")
        const filter = { _id: new ObjectId(docId) };
        const update = { $set: { status: "billing", btn_values: newContent } };

        const document = await HotelBenchModel.updateOne(filter, update);
        console.log(document);
        io.to(companyName).emit('documentUpdated', docId, newContent, "billing");

    })


}