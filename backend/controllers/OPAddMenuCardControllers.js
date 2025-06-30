const MenuListModel = require('../models/MenuListModel');

exports.addMenu = async (req, res, next) => {
    const requestData = req.body;
    console.log(requestData)
    try {
        const validateMenu = await MenuListModel.findOne({
            $and: [
                { menuItem: requestData.menuItem },
                { companyName: requestData.companyName },
            ],
        });
        if (validateMenu === null) {
            const newMenuList = await MenuListModel.insertMany(requestData);
            res.json({
                isAuth: true,
                errormsg: newMenuList,
            });
        } else {
            res.json({
                isAuth: false,
                errormsg: "Menu Already Register",
            });
        }


    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}