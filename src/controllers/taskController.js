const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

// Отримати всі завдання
const getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Отримати завдання за ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: { category: true, user: { select: { id: true, name: true, email: true } } },
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Створити завдання
const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description, dueDate, priority, categoryId, attachment } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        categoryId: categoryId || null,
        attachment: attachment || null,
        userId: 1,
      },
      include: { category: true },
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Оновити завдання
const updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const { title, description, dueDate, priority, completed, categoryId, attachment } = req.body;

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        completed,
        categoryId: categoryId || null,
        attachment: attachment || null,
      },
      include: { category: true },
    });

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Update task error:", error);
    if (error.code === "P2025") return res.status(404).json({ error: "Task not found" });
    res.status(500).json({ error: "Internal server error" });
  }
};

// Видалити завдання
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({ where: { id: parseInt(id) } });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    if (error.code === "P2025") return res.status(404).json({ error: "Task not found" });
    res.status(500).json({ error: "Internal server error" });
  }
};

const toggleTaskCompletion = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { completed: !task.completed },
    });

    res.json({ message: "Task completion toggled", task: updatedTask });
  } catch (error) {
    console.error("Toggle task completion error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
};
