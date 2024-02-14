// Import Express
const express = require("express");

// Import homePage function
const { homePage } = require("../controllers/indexControllers");

// Create router
const router = express.Router();

// Define route for home page
router.get("/", homePage);

// Export router
module.exports = router;
