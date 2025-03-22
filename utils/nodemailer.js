const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");
exports.sendMail = (req, res, next, url) => {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_EMAIL_ADDRESS, // your gmail address
            pass: process.env.MAIL_PASSWORD, // your gmail password
        },
        // Additional options
        // tls: {
        //     rejectUnauthorized: false, // Allow self-signed certificates
        // },
        // Custom SMTP configuration (if necessary)
        host: "smtp.gmail.com",
        port: 465,
        // secure: false,
        // requireTLS: true
    });
    // Create email options
    let mailOptions = {
        from: "from addy noven this side...", // sender address
        to: req.body.email, // list of receivers
        subject: "Password reset link", // Subject line
        html: `
        <h1>Password Reset</h1>
        <p>Hello,</p>
        <p>You have requested a password reset. Please follow the link below to reset your password:</p>
        <a href="${url}">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,</p>
        <p>Your Company</p>
    `,
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) next(new ErrorHandler(error, 500));
        res.status(200).json({
            message: "mail sent susccesfully",
            url,
        });
    });
};
