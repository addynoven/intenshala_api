const { catchAyncErrors } = require("../Middlewares/catchAyncErrors");

exports.homePage = catchAyncErrors(async (req, res, next) => {
    res.json({ message: "homepage" });
});
