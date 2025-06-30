const MenuListModel = require('../models/MenuListModel');

exports.viewMenu = async (req, res, next) => {
    const requestData = req.body;
    try {
        const employeeList = await MenuListModel.find({ companyName: requestData.companyName });
        res.json({
            isAuth: true,
            errormsg: employeeList,
        });

    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}