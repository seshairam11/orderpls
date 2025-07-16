exports.testController = async (req, res, next) => {
    try {
        res.json({
            isAuth: true,
            errormsg: "Test controller executed successfully",
        });
    } catch (err) {
        console.error("Test controller error:", err);
        res.json({
            isAuth: false,
            errormsg: "Error in test controller",
        });
    }
};