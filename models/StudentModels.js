const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const studentModel = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [
                /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
                "Please fill a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
            maxlength: [1024, "Password cannot exceed 1024 characters"],
            // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,"Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be between 8 and 1024 characters long",],
        },
    },
    { timestamps: true }
);

studentModel.pre("save", function () {
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

const Students = mongoose.model("students", studentModel);

module.exports = Students;
