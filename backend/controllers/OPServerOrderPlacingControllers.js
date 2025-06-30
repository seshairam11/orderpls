const { ObjectId } = require('mongodb');
const HotelBenchModel = require('../models/hotelBenchModel')
const MenuListModel = require('../models/MenuListModel')
exports.getServerOrderPlacing = async (Socket, io) => {
    Socket.on('joinServerOrderPlacing', async (companyName) => {
        try {
            Socket.join(companyName)
            const menuList = await MenuListModel.find({ companyName: companyName })
            const hotelBench = await HotelBenchModel.find({ companyName: companyName })
            console.log(menuList);
            console.log(hotelBench);
            
            Socket.emit('sendServerOrderPlacing', {
                menuList,
                hotelBench
            });
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('updateServerOrderPlacing', async (docId, newContent, companyName, serverName) => {

        const filter = { _id: new ObjectId(docId) };
        const update = { $set: { serverName: serverName, status: "waiting", btn_values: newContent } };

        const document = await HotelBenchModel.updateOne(filter, update);
        console.log(document);
        io.to(companyName).emit('documentUpdated', docId, newContent, "waiting");

    })


}