const { catchAyncErrors } = require("../Middlewares/catchAyncErrors");
const Students = require("../models/studentModels");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");

exports.homePage = catchAyncErrors(async (req, res, next) => {
    res.json({ message: "secure homepage" });
});

exports.currentUser = catchAyncErrors(async (req, res, next) => {
    const student = await Students.findById(req.id).exec();
    console.log(student);
    res.json({ student });
});

exports.studentSignup = catchAyncErrors(async (req, res, next) => {
    const students = await new Students(req.body).save();
    sendtoken(students, 201, res);
});

exports.studentSignin = catchAyncErrors(async (req, res, next) => {
    const student = await Students.findOne({ email: req.body.email })
        .select("+password")
        .exec();
    if (!student)
        return next(
            new ErrorHandler("student not found with this email address", 404)
        );
    const ismatch = student.comparePassword(req.body.password);
    if (!ismatch) return next(new ErrorHandler("Wrong credentials", 401));
    sendtoken(student, 200, res);
});

exports.studentSignout = catchAyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "all done" });
});
