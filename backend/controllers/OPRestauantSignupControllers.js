const AccessRestauantModel = require('../models/AccessRestauantModel');

exports.createRestauantAccess = async (req, res, next) => {
    const addUserDetailsParse = req.body;
    try {
        const validateCompanyName = await AccessRestauantModel.findOne({ CompanyName: addUserDetailsParse.CompanyName });
        if (validateCompanyName === null) {
            const existingUser = await AccessRestauantModel.findOne({ mailID: addUserDetailsParse.mailID });
            if (existingUser === null) {
                const validatePhoneno = await AccessRestauantModel.findOne({ phone: addUserDetailsParse.phone });
                // console.log(addUserDetailsParse.phone)
                if (validatePhoneno === null) {
                    console.log(addUserDetailsParse);
                    const registeringUser = await AccessRestauantModel.insertMany(addUserDetailsParse);
                    console.log(registeringUser);
                    res.json(
                        {
                            isAuth: true,
                            errormsg: "successfully registed",
                            value: registeringUser,
                        }
                    )
                } else {
                    res.json(
                        {
                            isAuth: false,
                            errormsg: "Phone no is already registered",
                        }
                    )
                }
            } else {
                res.json(
                    {
                        isAuth: false,
                        errormsg: "EmailId is already register",
                    }
                )
            }
        } else {
            res.json(
                {
                    isAuth: false,
                    errormsg: "Restauant name want to be unique",
                }
            )
        }
    } catch (err) {
        console.dir(err)
        res.json({
            isAuth: false,
            message: err.massage
        });
    }
}