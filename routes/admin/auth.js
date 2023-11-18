const express = require("express");
const router = express.Router();

//importing the controllers
const authControllers = require("../../controllers/admin/auth");

//importing validators
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../../validators/auth");
const { isAuth, isAdmin } = require("../../middlewares/auth");

router.post(
  "/signup",
  validateSignupRequest,
  isRequestValidated,
  authControllers.signup
);
router.post(
  "/signin",
  validateSigninRequest,
  isRequestValidated,
  authControllers.signin
);

router.get("/admins", isAuth, isAdmin, authControllers.getAllAdmins);

module.exports = router;
