const express = require("express");
const { body, param } = require("express-validator");
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

const taskValidation = [
  body("title")
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Title must be between 2 and 200 characters"),
  body("priority")
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Priority must be LOW, MEDIUM, or HIGH"),
  body("description").optional().isString(),
  body("dueDate").optional().isISO8601().toDate(),
  body("completed").optional().isBoolean(),
  body("timeSpent").optional().isFloat({ min: 0 }),
  body("attachment").optional().isString(),
  body("categoryId").optional().isInt(),
];

router.get("/", getAllTasks);
router.get("/:id", param("id").isInt(), getTaskById);
router.post("/", taskValidation, createTask);
router.put("/:id", param("id").isInt(), taskValidation, updateTask);
router.delete("/:id", param("id").isInt(), deleteTask);

module.exports = router;
