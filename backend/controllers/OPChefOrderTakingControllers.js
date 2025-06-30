const { ObjectId } = require('mongodb');
const HotelBenchModel = require('../models/hotelBenchModel')
exports.getChefOrderTaking = async (Socket, io) => {
    Socket.on('joinChefOrderTaking', async (companyName) => {
        try {
            Socket.join(companyName)
            const hotelBench = await HotelBenchModel.find({ companyName: companyName })
            
            Socket.emit('sendChefrOrderTaking', {
                hotelBench
            });
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('updateChefOrderTaking', async (docId, newContent, companyName, serverName) => {

        const filter = { _id: new ObjectId(docId) };
        const update = { $set: { serverName: serverName, status: "process", btn_values: newContent } };

        const document = await HotelBenchModel.updateOne(filter, update);
        console.log(document);
        io.to(companyName).emit('documentUpdated', docId, newContent, "process");

    })
}