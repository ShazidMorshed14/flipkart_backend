const express = require("express");
const router = express.Router();

//importing the controllers
const userControllers = require("../controllers/user");

router.post("/signup", userControllers.signup);
router.post("/signin", userControllers.signin);

module.exports = router;
