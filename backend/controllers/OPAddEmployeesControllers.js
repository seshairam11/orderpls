const AccessEmployeeModel = require('../models/AccessEmployeeModel');

exports.addEmployees = async (req, res, next) => {
    const requestData = req.body;
    console.log(requestData)
    try {
        const validateUserName = await AccessEmployeeModel.findOne({ mailID: requestData.userName });
        if (validateUserName === null) {
            const validateEmail = await AccessEmployeeModel.findOne({ mailID: requestData.mailID });
            if (validateEmail === null) {
                const validatePhoneno = await AccessEmployeeModel.findOne({ phone: requestData.phone });
                if (validatePhoneno === null) {
                    const newHotelUser = await AccessEmployeeModel.insertMany(requestData);
                    console.log(newHotelUser);
                    res.json({
                        isAuth: true,
                        errormsg: "login validate successfully",
                        value: newHotelUser
                    });
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
                errormsg: "Username already registered",
            });
        }
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}