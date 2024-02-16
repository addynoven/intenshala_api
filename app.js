// Load environment variables
require("dotenv").config({ path: "./.env" });

// Import modules
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/RouteIndex");
const ErrorHandler = require("./utils/ErrorHandler");
const genetatedErrors = require("./Middlewares/errors");

require("./models/database").connectDatabase();

// Create Express app
const app = express();

// Use morgan for logging
app.use(morgan("dev"));

// Parse incoming JSON requests
app.use(express.json());

// Parse incoming URL-encoded form data
app.use(express.urlencoded({ extended: false }));

//session and cookie
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);

app.use(cookieParser());

// Use routes
app.use("/", routes);

// Handle unmatched routes
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Requested page not found ${req.url}`, 404));
});

app.use(genetatedErrors);

// Start server
app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
