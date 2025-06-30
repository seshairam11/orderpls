const HotelBenchModel = require('../models/hotelBenchModel')

exports.addBench = async (req, res, next) => {
    const requestData = req.body;
    console.log(requestData)
    try {
        const validateMenu = await HotelBenchModel.findOne({
            $and: [
                { labelname: requestData.labelname },
                { companyName: requestData.companyName },
            ],
        });
        if (validateMenu === null) {
            const newBench = await HotelBenchModel.insertMany(requestData);
            res.json({
                isAuth: true,
                errormsg: newBench,
            });
        } else {
            res.json({
                isAuth: false,
                errormsg: "Bench Already Register",
            });
        }


    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}