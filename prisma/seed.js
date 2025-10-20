// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Користувачі
  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      birthDate: new Date("1990-05-10"),
      password: "password123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      birthDate: new Date("1985-08-22"),
      password: "password123",
    },
  });

  // Категорії
  const category1 = await prisma.category.create({
    data: { name: "Work" },
  });

  const category2 = await prisma.category.create({
    data: { name: "Personal" },
  });

  // Задачі
  const task1 = await prisma.task.create({
    data: {
      title: "Complete project",
      priority: "HIGH",
      userId: user1.id,
      categoryId: category1.id,
      dueDate: new Date("2025-10-30"),
      completed: false,
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: "Buy groceries",
      priority: "MEDIUM",
      userId: user2.id,
      categoryId: category2.id,
      completed: false,
    },
  });

  // Timelogs
  await prisma.timelog.create({
    data: {
      userId: user1.id,
      taskId: task1.id,
      startTime: new Date("2025-10-19T09:00:00"),
      endTime: new Date("2025-10-19T11:00:00"),
      duration: 2,
    },
  });

  await prisma.timelog.create({
    data: {
      userId: user2.id,
      taskId: task2.id,
      startTime: new Date("2025-10-19T15:00:00"),
      endTime: new Date("2025-10-19T16:30:00"),
      duration: 1.5,
    },
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
