const { ObjectId } = require('mongodb');
const HotelBenchModel = require('../models/hotelBenchModel')
const MenuListModel = require('../models/MenuListModel')
exports.getServerOrderProcessing = async (Socket, io) => {
    Socket.on('joinServerOrderProcessing', async (companyName) => {
        try {
            Socket.join(companyName)
            const menuList = await MenuListModel.find({ companyName: companyName })
            const hotelBench = await HotelBenchModel.find({ companyName: companyName })
            Socket.emit('sendServerOrderProcessing', {
                menuList,
                hotelBench
            });
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('updateServerOrderProcessing', async (docId, newContent, companyName) => {
        const BenchStatus = await HotelBenchModel.findOne({
            $and: [
                { _id: new ObjectId(docId) },
                { companyName: companyName },
            ],
        });
        const filter = { _id: new ObjectId(docId) };
        const update = { $set: { status: BenchStatus.status === "close" ? "process" : BenchStatus.status, btn_values: newContent } };

        const document = await HotelBenchModel.updateOne(filter, update);
        io.to(companyName).emit('documentUpdated', docId, newContent, "process");
    })


}