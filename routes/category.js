const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/auth");
const router = express.Router();

//importing the controllers
const categoryControllers = require("../controllers/category");

router.get("/", categoryControllers.getAllCategory);
router.post("/create", isAuth, isAdmin, categoryControllers.createCategory);

module.exports = router;
