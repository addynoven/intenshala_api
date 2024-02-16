// Import Express
const express = require("express");

// Import homePage function
const {
    homePage,
    studentSignup,
    studentSignin,
    studentSignout,
    currentUser,
} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../Middlewares/auth");

// Create router
const router = express.Router();

// GET /
router.get("/", homePage);

//POST /student/
router.post("/student/", isAuthenticated, currentUser);

// POST /student/signup
router.post("/student/signup", studentSignup);

// POST /student/signin
router.post("/student/signin", studentSignin);

// GET /student/signout
router.get("/student/signout", isAuthenticated, studentSignout);

// Export router
module.exports = router;
