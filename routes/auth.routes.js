/**
 *
 *
 * Route: /services/login
 *
 *
 */
const { Router } = require("express");
const { login } = require("../controllers/auith.controllers");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields.middleware");
const router = Router();

router.post(
  "/",
  [
    check("email", "Email is required")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("must provide a valid email"),
    check("password", "Password is required").notEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
