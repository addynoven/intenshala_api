exports.sendtoken = (user, statusCode, res) => {
    const token = user.getJwtToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXIPRE * 1000 * 60 * 60 * 24
        ),
        httpOnly: true,
        // secure: true,
    };
    res.status(statusCode).cookie("token", token, options).json({ token });
};
