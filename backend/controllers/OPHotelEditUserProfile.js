const AccessHotelModel = require('../models/AccessHotelModel');

exports.editHotelUserProfile = async (req, res, next) => {
    const requestID = req.body[0];
    const requestData = req.body[1];

    try {
        console.log(requestData)
        const validateHotel = await AccessHotelModel.findOne({ companyName: requestData.companyName });
        if (validateHotel === null) {
            const validateEmail = await AccessHotelModel.findOne({ mailID: requestData.mailID });
            if (validateEmail === null) {
                const validatePhoneno = await AccessHotelModel.findOne({ phone: requestData.phone });
                if (validatePhoneno === null) {
                    const upadteUserProfile = await AccessHotelModel.updateOne(
                        { _id: requestID.id },
                        { $set: requestData }
                    );
                    console.log(upadteUserProfile);
                    res.json({
                        isAuth: true,
                        errormsg: "Details updates sucessfully",
                        value: requestData
                    })
                } else {
                    res.json({
                        isAuth: false,
                        errormsg: "phoneno already registered",
                    });
                }
            } else {
                res.json({
                    isAuth: false,
                    errormsg: "EmailID already registered",
                });
            }
        } else {
            res.json({
                isAuth: false,
                errormsg: "Restauant already registered",
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            isAuth: false,
            message: error,
        })
    }

};
