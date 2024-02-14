const { catchAyncErrors } = require("../Middlewares/catchAyncErrors");
const Students = require("../models/studentModels");

exports.homePage = catchAyncErrors(async (req, res, next) => {
    res.json({ message: "homepage" });
});

exports.studentSignup = catchAyncErrors(async (req, res, next) => {
    const students = await new Students(req.body).save();
    res.status(201).json(students);
});

exports.studentSignin = catchAyncErrors(async (req, res, next) => {
    const students = await new Students(req.body).save();
    res.status(201).json(students);
});

exports.studentSignout = catchAyncErrors(async (req, res, next) => {
    const students = await new Students(req.body).save();
    res.status(201).json(students);
});
