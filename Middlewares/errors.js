module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.log("hello", "line 3");
    if (
        err.name === "MongoServerError" &&
        err.message.includes("E11000 duplicate key")
    ) {
        err.message = `student with this email address already exists`;
    }
    res.status(statusCode).json({
        success: false,
        error: { errName: err.name, code: statusCode, message: err.message },
        // stack: err.stack,
    });
};
