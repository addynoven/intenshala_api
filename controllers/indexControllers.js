const { catchAyncErrors } = require("../Middlewares/catchAyncErrors");
const Students = require("../models/studentModels");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendMail } = require("../utils/nodemailer");

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

exports.studentsendmail = catchAyncErrors(async (req, res, next) => {
    const student = await Students.findOne({ email: req.body.email }).exec();
    if (!student)
        return next(
            new ErrorHandler("student not found with this email address", 404)
        );
    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
        student.id
    }`;
    student.resetPasswordToken = "1";
    await student.save();
    console.log(url);
    sendMail(req, res, next, url);
});

exports.studentforgetlink = catchAyncErrors(async (req, res, next) => {
    const student = await Students.findById(req.params.id).exec();
    console.log(student);
    if (student.resetPasswordToken === "1") {
        student.resetPasswordToken = "0";
        student.password = req.body.password;
        await student.save();
    } else {
        return next(
            new ErrorHandler(
                "Invalid Reset Password Link! Please try again",
                401
            )
        );
    }
    res.status(201).json({
        message: "Password has been successfully changed",
    });
});

exports.studentresetpassword = catchAyncErrors(async (req, res, next) => {
    const student = await Students.findById(req.id).exec();
    student.password = req.body.password;
    student.save();
    sendtoken(student, 200, res);
});
