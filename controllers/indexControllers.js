const { catchAyncErrors } = require("../Middlewares/catchAyncErrors");
const Students = require("../models/studentModels");
const ErrorHandler = require("../utils/ErrorHandler");

exports.homePage = catchAyncErrors(async (req, res, next) => {
    res.json({ message: "homepage" });
});

exports.studentSignup = catchAyncErrors(async (req, res, next) => {
    const students = await new Students(req.body).save();
    res.status(201).json(students);
});

exports.studentSignin = catchAyncErrors(async (req, res, next) => {
    const student = await Students.findOne({ email: req.body.email })
        .select("+password")
        .exec();
    if (!student)
        return next(
            new ErrorHandler("student not found with this email address", 404)
        );
    console.log("hello world");
    const ismatch = student.comparePassword(req.body.password);
    if (!ismatch) return next(new ErrorHandler("Wrong credentials", 401));
    res.status(201).json(student);
});

exports.studentSignout = catchAyncErrors(async (req, res, next) => {});
