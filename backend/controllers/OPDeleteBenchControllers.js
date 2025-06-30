const HotelBenchModel = require('../models/hotelBenchModel')

exports.deleteBench = async (req, res, next) => {
    const requestData = req.body;
    console.log(requestData)
    try {
        const benchDetails = await HotelBenchModel.findOne({ _id: requestData._id });
        const benchDelete = await HotelBenchModel.deleteOne({ _id: requestData._id });
        console.log(benchDelete)
        res.json({
            isAuth: true,
            errormsg: benchDetails,
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}