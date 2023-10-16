const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/auth");
const router = express.Router();

//importing the controllers
const categoryControllers = require("../controllers/category");

//importing the validator
const {
  ValidateCategoryCreate,
  isCategoryRequestValidated,
} = require("../validators/category");

router.get("/", categoryControllers.getAllCategory);
router.post(
  "/create",
  isAuth,
  isAdmin,
  ValidateCategoryCreate,
  isCategoryRequestValidated,
  categoryControllers.createCategory
);

module.exports = router;
