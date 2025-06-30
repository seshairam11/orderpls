const HotelBenchModel = require('../models/hotelBenchModel')

exports.viewBench = async (req, res, next) => {
    const requestData = req.body;
    try {
        const benchList = await HotelBenchModel.find({ companyName: requestData.companyName });
        res.json({
            isAuth: true,
            errormsg: benchList,
        });

    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}