const express = require("express");
const { body, param } = require("express-validator");
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

const categoryValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Category name must be between 2 and 100 characters"),
];

router.get("/", getAllCategories);
router.get("/:id", param("id").isInt(), getCategoryById);
router.post("/", categoryValidation, createCategory);
router.put("/:id", param("id").isInt(), categoryValidation, updateCategory);
router.delete("/:id", param("id").isInt(), deleteCategory);

module.exports = router;
