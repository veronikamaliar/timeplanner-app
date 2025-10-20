require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Імпортуємо маршрути
const userRoutes = require("./routes/users"); 
const taskRoutes = require("./routes/tasks");
const categoryRoutes = require("./routes/categories");
const timelogRoutes = require("./routes/timelogs");

// Middleware для обробки помилок
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Маршрути
app.use("/api/users", userRoutes);       
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/timelogs", timelogRoutes);

// Базовий маршрут
app.get("/", (req, res) => {
  res.json({
    message: "Time Planner API Server",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      tasks: "/api/tasks",    
      categories: "/api/categories",
      timelogs: "/api/timelogs",   
    },
  });
});

// Обробка неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Обробка помилок має бути в кінці
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at: http://localhost:${PORT}`);
  console.log(`📚 Endpoints: http://localhost:${PORT}/api`);
});

module.exports = app;
