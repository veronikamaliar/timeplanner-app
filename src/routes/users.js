const express = require("express");
const { body, param } = require("express-validator");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

const userValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),
  body("birthDate")
    .isISO8601()
    .toDate()
    .withMessage("birthDate must be a valid date"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

router.get("/", getAllUsers);
router.get("/:id", param("id").isInt(), getUserById);
router.post("/", userValidation, createUser);
router.put("/:id", param("id").isInt(), userValidation, updateUser);
router.delete("/:id", param("id").isInt(), deleteUser);

module.exports = router;
