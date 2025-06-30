const AccessEmployeeModel = require('../models/AccessEmployeeModel');

exports.deleteEmployees = async (req, res, next) => {
    const requestData = req.body;
    console.log(requestData)
    try {
        const employeeDetails = await AccessEmployeeModel.findOne({ _id: requestData._id });
        const employeeDelete = await AccessEmployeeModel.deleteOne({ _id: requestData._id });
        console.log(employeeDelete)
        res.json({
            isAuth: true,
            errormsg: employeeDetails,
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}