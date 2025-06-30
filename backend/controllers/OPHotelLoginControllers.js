const AccessHotelModel = require('../models/AccessHotelModel');

exports.validateHotelAccess = async (req, res, next) => {
    const validateUser = req.body;
    try {
        const loginCredential = await AccessHotelModel.findOne({
            $or: [
                { mailID: validateUser.loginID },
                { phone: validateUser.loginID },
                { companyName: validateUser.loginID },
            ],
        });
        console.log(loginCredential)
        if (loginCredential !== null) {
            if (loginCredential.password === validateUser.password) {
                res.json(
                    {
                        isAuth: true,
                        message: "Login Successfully",
                        employeeID: loginCredential._id,
                        mailID: loginCredential.mailID,
                        userName: loginCredential?.userName,
                        phone: loginCredential.phone,
                        usertype: loginCredential.usertype,
                        room: loginCredential.room,
                        companyName: loginCredential.companyName
                    })
            } else {
                res.json({
                    isAuth: false,
                    message: "Wrong Password",
                });
            }
        } else {
            res.json({
                isAuth: false,
                message: "LoginID didn't matched",
            });
        }
    } catch (error) {
        console.dir(error)
        res.json({
            isAuth: false,
            message: error,
        });
    }
};
