const { ObjectId } = require('mongodb');
const HotelBenchModel = require('../models/hotelBenchModel')
exports.getChefOrderCompleted = async (Socket, io) => {
    Socket.on('joinChefOrderCompleted', async (companyName) => {
        try {
            Socket.join(companyName)
            const hotelBench = await HotelBenchModel.find({ companyName: companyName })
            
            Socket.emit('sendChefrOrderCompleted', {
                hotelBench
            });
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('updateChefOrderCompleted', async (docId, newContent, companyName, serverName) => {

        const filter = { _id: new ObjectId(docId) };
        const update = { $set: { serverName: serverName, status: "close", btn_values: newContent } };

        const document = await HotelBenchModel.updateOne(filter, update);
        console.log(document);
        io.to(companyName).emit('documentUpdated', docId, newContent, "close");

    })
}