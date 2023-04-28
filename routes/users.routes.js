/**
 *
 *
 * Route: /services/users
 *
 *
 */
const { Router } = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/users.controllers");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields.middleware");
const { validateJWT } = require("../middlewares/validate-jwt.middleware");
const router = Router();

//CRUD
router.get("/",validateJWT ,getUsers);

router.post(
  "/",
  [
    check("name", "name is required").notEmpty(),
    check("password", "password is required").notEmpty(),
    check("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("must provide a valid email"),
    validateFields,
  ],
  createUser
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "name is required").notEmpty(),
    check("email", "email is required").isEmail(),
    check("role", "role is required").notEmpty(),
    validateFields,
  ],
  updateUser
);



router.delete(
  "/:id",
  validateJWT,
  // [
  //   check("name", "name is required").notEmpty(),
  //   check("email", "email is required").isEmail(),
  //   check("role", "role is required").notEmpty(),
  //   validateFields,
  // ],
  deleteUser
);


module.exports = router;
