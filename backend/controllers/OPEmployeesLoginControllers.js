const AccessEmployeeModel = require('../models/AccessEmployeeModel');

exports.validateUserAccess = async (req, res, next) => {
    const validateUser = req.body;
    console.log(validateUser);
    try {
        const loginCredential = await AccessEmployeeModel.findOne({
            $or: [
                { userName: validateUser.loginID },
                { mailID: validateUser.loginID },
                { phone: validateUser.loginID },
            ],
        });

        if (loginCredential !== null) {
            if (loginCredential.password === validateUser.password) {
                res.json(
                    {
                        isAuth: true,
                        errmsg: "Login Successfully",
                        employeeID: loginCredential._id,
                        userName: loginCredential.userName,
                        employeeType: loginCredential.employeeType,
                        room: loginCredential.room,
                        companyName: loginCredential.companyName,
                        mailID: loginCredential.mailID,
                        
                    })
            } else {
                res.json({
                    isAuth: false,
                    errmsg: "Wrong Password",
                });
            }
        } else {
            res.json({
                isAuth: false,
                errmsg: "LoginID didn't matched",
            });
        }
    } catch (error) {
        console.log(error)
        res.json({
            isAuth: false,
            errmsg: error,
        });
    }
};
