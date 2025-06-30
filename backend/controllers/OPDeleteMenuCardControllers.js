const MenuListModel = require('../models/MenuListModel');

exports.deleteMenu = async (req, res, next) => {
    const requestData = req.body;
    console.log(requestData)
    try {
        const menuDetails = await MenuListModel.findOne({ _id: requestData._id });
        const menuDelete = await MenuListModel.deleteOne({ _id: requestData._id });
        console.log(menuDelete)
        res.json({
            isAuth: true,
            errormsg: menuDetails,
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}