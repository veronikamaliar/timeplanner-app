const express = require("express");
const { body, param } = require("express-validator");
const {
  getAllTimelogs,
  getTimelogById,
  createTimelog,
  updateTimelog,
  deleteTimelog,
} = require("../controllers/timelogController");

const router = express.Router();

const timelogValidation = [
  body("userId").isInt().withMessage("userId must be an integer"),
  body("taskId").isInt().withMessage("taskId must be an integer"),
  body("startTime").isISO8601().toDate().withMessage("startTime must be a valid date"),
  body("endTime").optional().isISO8601().toDate(),
  body("duration").optional().isFloat({ min: 0 }),
];

router.get("/", getAllTimelogs);
router.get("/:id", param("id").isInt(), getTimelogById);
router.post("/", timelogValidation, createTimelog);
router.put("/:id", param("id").isInt(), timelogValidation, updateTimelog);
router.delete("/:id", param("id").isInt(), deleteTimelog);

module.exports = router;
