const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

// Отримати всіх користувачів
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: { tasks: true, timelogs: true },
        },
      },
      orderBy: { name: "asc" },
    });

    const usersWithCount = users.map((user) => ({
      ...user,
      taskCount: user._count.tasks,
      timelogCount: user._count.timelogs,
    }));

    res.json(usersWithCount);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Отримати користувача за ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        tasks: { take: 10, orderBy: { createdAt: "desc" } },
        timelogs: { take: 10, orderBy: { startTime: "desc" } },
        _count: { select: { tasks: true, timelogs: true } },
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const userWithCount = {
      ...user,
      taskCount: user._count.tasks,
      timelogCount: user._count.timelogs,
    };

    res.json(userWithCount);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Створити користувача
const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, birthDate, password } = req.body;

    const user = await prisma.user.create({
      data: { name, email, birthDate, password },
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Create user error:", error);

    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

// Оновити користувача
const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const { name, email, birthDate, password } = req.body;

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, birthDate, password },
      include: { _count: { select: { tasks: true, timelogs: true } } },
    });

    const userWithCount = {
      ...user,
      taskCount: user._count.tasks,
      timelogCount: user._count.timelogs,
    };

    res.json({
      message: "User updated successfully",
      user: userWithCount,
    });
  } catch (error) {
    console.error("Update user error:", error);

    if (error.code === "P2025") return res.status(404).json({ error: "User not found" });

    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

// Видалити користувача
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const tasksCount = await prisma.task.count({ where: { userId: parseInt(id) } });
    const timelogsCount = await prisma.timelog.count({ where: { userId: parseInt(id) } });

    if (tasksCount > 0 || timelogsCount > 0) {
      return res.status(400).json({
        error: "Cannot delete user with existing tasks or timelogs",
        message: `This user has ${tasksCount} tasks and ${timelogsCount} timelogs. Please remove them first.`,
      });
    }

    await prisma.user.delete({ where: { id: parseInt(id) } });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);

    if (error.code === "P2025") return res.status(404).json({ error: "User not found" });

    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
