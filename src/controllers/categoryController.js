const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

// Отримати всі категорії
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: { name: "asc" },
    });

    const categoriesWithCount = categories.map((category) => ({
      ...category,
      taskCount: category._count.tasks,
    }));

    res.json(categoriesWithCount);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Отримати категорію за ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        tasks: {
          take: 10,
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { tasks: true } },
      },
    });

    if (!category) return res.status(404).json({ error: "Category not found" });

    const categoryWithCount = {
      ...category,
      taskCount: category._count.tasks,
    };

    res.json(categoryWithCount);
  } catch (error) {
    console.error("Get category error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Створити категорію
const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name } = req.body;

    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create category error:", error);

    if (error.code === "P2002" && error.meta?.target?.includes("name")) {
      return res.status(400).json({ error: "Category with this name already exists" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

// Оновити категорію
const updateCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const { name } = req.body;

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
      include: { _count: { select: { tasks: true } } },
    });

    const categoryWithCount = {
      ...category,
      taskCount: category._count.tasks,
    };

    res.json({
      message: "Category updated successfully",
      category: categoryWithCount,
    });
  } catch (error) {
    console.error("Update category error:", error);

    if (error.code === "P2025") return res.status(404).json({ error: "Category not found" });

    if (error.code === "P2002" && error.meta?.target?.includes("name")) {
      return res.status(400).json({ error: "Category with this name already exists" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

// Видалити категорію
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const tasksCount = await prisma.task.count({ where: { categoryId: parseInt(id) } });

    if (tasksCount > 0) {
      return res.status(400).json({
        error: "Cannot delete category with existing tasks",
        message: `This category contains ${tasksCount} tasks. Please move or delete them first.`,
      });
    }

    await prisma.category.delete({ where: { id: parseInt(id) } });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete category error:", error);

    if (error.code === "P2025") return res.status(404).json({ error: "Category not found" });

    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
