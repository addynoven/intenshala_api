// Import Express
const express = require("express");

// Import homePage function
const {
    homePage,
    studentSignup,
    studentSignin,
    studentSignout,
} = require("../controllers/indexControllers");

// Create router
const router = express.Router();

// GET /
router.get("/", homePage);

// POST /student/signup
router.post("/student/signup", studentSignup);

// POST /student/signin
router.post("/student/signin", studentSignin);

// GET /student/signout
router.get("/student/signout", studentSignout);

// Export router
module.exports = router;
