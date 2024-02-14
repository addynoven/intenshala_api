// Load environment variables
require("dotenv").config({ path: "./.env" });

// Import modules
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/Index");
const ErrorHandler = require("./utils/errorHandler");
const genetatedErrors = require("./Middlewares/errors");

// Create Express app
const app = express();

// Use morgan for logging
app.use(morgan("dev"));

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
