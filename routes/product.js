const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/auth");
const router = express.Router();

//importing the controllers
const productControllers = require("../controllers/product");

//importing the validator
const {
  validateProductCreate,
  isProductRequestValidated,
} = require("../validators/product");

router.get("/", (req, res) => {
  return res.status(200).json({ mesage: "fetched all products" });
});
router.post(
  "/create",
  isAuth,
  isAdmin,
  validateProductCreate,
  isProductRequestValidated,
  (req, res) => {
    return res.status(200).json({ mesage: "create New products" });
  }
);

module.exports = router;
