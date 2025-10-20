# Time Planner app

## 🌐 Base URL
```
http://localhost:3000
```

## 📚 Available Endpoints

### 🏠 Root Endpoint
- **GET** `/` - API information and available endpoints

---

## Users

### Get All Users
- **GET** `/api/users`
- **Response:**
```json
[
    {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com",
        "birthDate": "1990-05-10T00:00:00.000Z",
        "password": "password123",
        "_count": {
            "tasks": 1,
            "timelogs": 2
        },
        "taskCount": 1,
        "timelogCount": 2
    },
    {
        "id": 2,
        "name": "Bob",
        "email": "bob@example.com",
        "birthDate": "1985-08-22T00:00:00.000Z",
        "password": "password123",
        "_count": {
            "tasks": 1,
            "timelogs": 1
        },
        "taskCount": 1,
        "timelogCount": 1
    }
]
```

### Get User by ID
- **GET** `/api/users/1`
- **Response:**
```json
{
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "birthDate": "1990-05-10T00:00:00.000Z",
    "password": "password123",
    "tasks": [
        {
            "id": 1,
            "title": "Complete project",
            "description": null,
            "dueDate": "2025-10-30T00:00:00.000Z",
            "priority": "HIGH",
            "timeSpent": 0,
            "completed": false,
            "attachment": null,
            "userId": 1,
            "categoryId": 1,
            "createdAt": "2025-10-19T18:40:51.740Z",
            "updatedAt": "2025-10-19T18:40:51.740Z"
        }
    ],
    "timelogs": [
        {
            "id": 5,
            "userId": 1,
            "taskId": 1,
            "startTime": "2025-10-20T12:00:00.000Z",
            "endTime": "2025-10-25T12:00:00.000Z",
            "duration": 120,
            "createdAt": "2025-10-20T13:01:01.315Z"
        },
        {
            "id": 1,
            "userId": 1,
            "taskId": 1,
            "startTime": "2025-10-19T06:00:00.000Z",
            "endTime": "2025-10-19T08:00:00.000Z",
            "duration": 2,
            "createdAt": "2025-10-19T18:40:51.746Z"
        }
    ],
    "_count": {
        "tasks": 1,
        "timelogs": 2
    },
    "taskCount": 1,
    "timelogCount": 2
}
```

### Create User
- **POST** `/api/users`
- **Body:**
```json
{
  "name": "Natalia",
  "email": "natalia@example.com",
  "birthDate": "2000-05-20",
  "password": "Aa123456"
}
```
- **Response:**
```json
{
    "message": "User created successfully",
    "user": {
        "id": 8,
        "name": "Natalia",
        "email": "natalia@example.com",
        "birthDate": "2000-05-20T00:00:00.000Z",
        "password": "Aa123456"
    }
}
```

### Update User
- **PUT** `/api/users/8`
- **Body:**
```json
{
  "name": "Natalia",
  "email": "natalia@example.com",
  "birthDate": "2000-05-20",
  "password": "Bb98765"
}
```
- **Response:**
```json
{
    "message": "User updated successfully",
    "user": {
        "id": 8,
        "name": "Natalia",
        "email": "natalia@example.com",
        "birthDate": "2000-05-20T00:00:00.000Z",
        "password": "Bb98765",
        "_count": {
            "tasks": 0,
            "timelogs": 0
        },
        "taskCount": 0,
        "timelogCount": 0
    }
}
```

### Delete User
- **PUT** `/api/users/8`
- **Body:**
```json
{
  "name": "Natalia",
  "email": "natalia@example.com",
  "birthDate": "2000-05-20",
  "password": "Bb98765"
}
```
- **Response:**
```json
{
    "message": "User deleted successfully"
}
```

---

## Tasks

### Get All Tasks
- **GET** `/api/tasks`
- **Response:**
```json
[
    {
        "id": 2,
        "title": "Buy groceries",
        "description": null,
        "dueDate": null,
        "priority": "MEDIUM",
        "timeSpent": 0,
        "completed": false,
        "attachment": null,
        "userId": 2,
        "categoryId": 2,
        "createdAt": "2025-10-19T18:40:51.744Z",
        "updatedAt": "2025-10-19T18:40:51.744Z",
        "category": {
            "id": 2,
            "name": "Personal"
        }
    },
    {
        "id": 1,
        "title": "Complete project",
        "description": null,
        "dueDate": "2025-10-30T00:00:00.000Z",
        "priority": "HIGH",
        "timeSpent": 0,
        "completed": false,
        "attachment": null,
        "userId": 1,
        "categoryId": 1,
        "createdAt": "2025-10-19T18:40:51.740Z",
        "updatedAt": "2025-10-19T18:40:51.740Z",
        "category": {
            "id": 1,
            "name": "Work"
        }
    }
]
```

### Get Tasks by ID
- **GET** `/api/tasks/2`
- **Response:**
```json
{
    "id": 2,
    "title": "Buy groceries",
    "description": null,
    "dueDate": null,
    "priority": "MEDIUM",
    "timeSpent": 0,
    "completed": false,
    "attachment": null,
    "userId": 2,
    "categoryId": 2,
    "createdAt": "2025-10-19T18:40:51.744Z",
    "updatedAt": "2025-10-19T18:40:51.744Z",
    "category": {
        "id": 2,
        "name": "Personal"
    },
    "user": {
        "id": 2,
        "name": "Bob",
        "email": "bob@example.com"
    }
}
```

### Create Task
- **POST** `/api/tasks`
- **Body:**
```json
{
    "title": "Task",
    "description": "Finish assignments",
    "dueDate": "2025-10-31",
    "priority": "HIGH",
    "categoryId": 1,
    "attachment": "",
    "userId": 1
}
```
- **Response:**
```json
{
    "message": "Task created successfully",
    "task": {
        "id": 5,
        "title": "Task",
        "description": "Finish assignments",
        "dueDate": "2025-10-31T00:00:00.000Z",
        "priority": "HIGH",
        "timeSpent": 0,
        "completed": false,
        "attachment": null,
        "userId": 1,
        "categoryId": 1,
        "createdAt": "2025-10-20T17:52:21.456Z",
        "updatedAt": "2025-10-20T17:52:21.456Z",
        "category": {
            "id": 1,
            "name": "Work"
        }
    }
}
```

### Update Task
- **PUT** `/api/tasks/5`
- **Body:**
```json
{
    "title": "Task",
    "description": "Finish assignments",
    "dueDate": "2025-10-31",
    "priority": "MEDIUM",
    "categoryId": 1,
    "attachment": "",
    "userId": 1
}
```
- **Response:**
```json
{
    "message": "Task updated successfully",
    "task": {
        "id": 5,
        "title": "Task",
        "description": "Finish assignments",
        "dueDate": "2025-10-31T00:00:00.000Z",
        "priority": "MEDIUM",
        "timeSpent": 0,
        "completed": false,
        "attachment": null,
        "userId": 1,
        "categoryId": 1,
        "createdAt": "2025-10-20T17:52:21.456Z",
        "updatedAt": "2025-10-20T17:53:25.906Z",
        "category": {
            "id": 1,
            "name": "Work"
        }
    }
}
```

### Delete Task
- **PUT** `/api/tasks/5`
- **Body:**
```json
{
    "title": "Task",
    "description": "Finish assignments",
    "dueDate": "2025-10-31",
    "priority": "MEDIUM",
    "categoryId": 1,
    "attachment": "",
    "userId": 1
}
```
- **Response:**
```json
{
    "message": "Task deleted successfully"
}
```
---

## Categories

### Get All Categories
- **GET** `/api/categories`
- **Response:**
```json
[
    {
        "id": 2,
        "name": "Personal",
        "_count": {
            "tasks": 1
        },
        "taskCount": 1
    },
    {
        "id": 1,
        "name": "Work",
        "_count": {
            "tasks": 1
        },
        "taskCount": 1
    }
]
```

### Get Category by ID
- **GET** `/api/categories/1`
- **Response:**
```json
{
    "id": 1,
    "name": "Work",
    "tasks": [
        {
            "id": 5,
            "title": "Task",
            "description": "Finish assignments",
            "dueDate": "2025-10-31T00:00:00.000Z",
            "priority": "MEDIUM",
            "timeSpent": 0,
            "completed": false,
            "attachment": null,
            "userId": 1,
            "categoryId": 1,
            "createdAt": "2025-10-20T17:52:21.456Z",
            "updatedAt": "2025-10-20T17:53:25.906Z"
        },
        {
            "id": 1,
            "title": "Complete project",
            "description": null,
            "dueDate": "2025-10-30T00:00:00.000Z",
            "priority": "HIGH",
            "timeSpent": 0,
            "completed": false,
            "attachment": null,
            "userId": 1,
            "categoryId": 1,
            "createdAt": "2025-10-19T18:40:51.740Z",
            "updatedAt": "2025-10-19T18:40:51.740Z"
        }
    ],
    "_count": {
        "tasks": 2
    },
    "taskCount": 2
}
```

### Create Category
- **POST** `/api/categories`
- **Body:**
```json
{
    "name": "Sport" 
}
```
- **Response:**
```json
{
    "message": "Category created successfully",
    "category": {
        "id": 5,
        "name": "Sport"
    }
}
```

### Update Category
- **PUT** `/api/categories/5`
- **Body:**
```json
{
    "name": "Fitness" 
}
```
- **Response:**
```json
{
    "message": "Category updated successfully",
    "category": {
        "id": 5,
        "name": "Fitness",
        "_count": {
            "tasks": 0
        },
        "taskCount": 0
    }
}
```

### Delete Category
- **PUT** `/api/categories/5`
- **Body:**
```json
{
    "name": "Fitness" 
}
```
- **Response:**
```json
{
    "message": "Category deleted successfully"
}
```
---

## Timelogs

### Get All Timelogs
- **GET** `/api/timelogs`
- **Response:**
```json
[
    {
        "id": 2,
        "userId": 2,
        "taskId": 2,
        "startTime": "2025-10-19T12:00:00.000Z",
        "endTime": "2025-10-19T13:30:00.000Z",
        "duration": 1.5,
        "createdAt": "2025-10-19T18:40:51.749Z",
        "task": {
            "id": 2,
            "title": "Buy groceries",
            "description": null,
            "dueDate": null,
            "priority": "MEDIUM",
            "timeSpent": 0,
            "completed": false,
            "attachment": null,
            "userId": 2,
            "categoryId": 2,
            "createdAt": "2025-10-19T18:40:51.744Z",
            "updatedAt": "2025-10-19T18:40:51.744Z"
        },
        "user": {
            "id": 2,
            "name": "Bob",
            "email": "bob@example.com",
            "birthDate": "1985-08-22T00:00:00.000Z",
            "password": "password123"
        }
    },
    {
        "id": 1,
        "userId": 1,
        "taskId": 1,
        "startTime": "2025-10-19T06:00:00.000Z",
        "endTime": "2025-10-19T08:00:00.000Z",
        "duration": 2,
        "createdAt": "2025-10-19T18:40:51.746Z",
        "task": {
            "id": 1,
            "title": "Complete project",
            "description": null,
            "dueDate": "2025-10-30T00:00:00.000Z",
            "priority": "HIGH",
            "timeSpent": 0,
            "completed": false,
            "attachment": null,
            "userId": 1,
            "categoryId": 1,
            "createdAt": "2025-10-19T18:40:51.740Z",
            "updatedAt": "2025-10-19T18:40:51.740Z"
        },
        "user": {
            "id": 1,
            "name": "Alice",
            "email": "alice@example.com",
            "birthDate": "1990-05-10T00:00:00.000Z",
            "password": "password123"
        }
    }
]
```

### Get Timelog by ID
- **GET** `/api/timelogs/1`
- **Response:**
```json
{
    "id": 1,
    "userId": 1,
    "taskId": 1,
    "startTime": "2025-10-19T06:00:00.000Z",
    "endTime": "2025-10-19T08:00:00.000Z",
    "duration": 2,
    "createdAt": "2025-10-19T18:40:51.746Z",
    "task": {
        "id": 1,
        "title": "Complete project",
        "description": null,
        "dueDate": "2025-10-30T00:00:00.000Z",
        "priority": "HIGH",
        "timeSpent": 0,
        "completed": false,
        "attachment": null,
        "userId": 1,
        "categoryId": 1,
        "createdAt": "2025-10-19T18:40:51.740Z",
        "updatedAt": "2025-10-19T18:40:51.740Z"
    },
    "user": {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com"
    }
}
```

### Create Timelog
- **POST** `/api/timelogs`
- **Body:**
```json
{
    "taskId": 1,
    "userId": 1,
    "startTime": "2025-10-20T12:00:00.000Z",
    "endTime": "2025-10-25T12:00:00.000Z",
    "priority": "SMALL"
}
```
- **Response:**
```json
{
    "message": "Timelog created successfully",
    "timelog": {
        "id": 5,
        "userId": 1,
        "taskId": 1,
        "startTime": "2025-10-20T12:00:00.000Z",
        "endTime": "2025-10-25T12:00:00.000Z",
        "duration": 120,
        "createdAt": "2025-10-20T13:01:01.315Z",
        "task": {
            "id": 1,
            "title": "Complete project",
            "description": null,
            "dueDate": "2025-10-30T00:00:00.000Z",
            "priority": "SMALL",
            "timeSpent": 0,
            "completed": false,
            "attachment": null,
            "userId": 1,
            "categoryId": 1,
            "createdAt": "2025-10-19T18:40:51.740Z",
            "updatedAt": "2025-10-19T18:40:51.740Z"
        }
    }
}
```

### Update Timelog
- **PUT** `/api/timelogs/6`
- **Body:**
```json
{
    "taskId": 1,
    "userId": 1,
    "startTime": "2025-10-20T12:00:00.000Z",
    "endTime": "2025-10-30T12:00:00.000Z",
    "priority": "MEDIUM"
}
```
- **Response:**
```json
{
    "message": "Timelog updated successfully",
    "timelog": {
        "id": 6,
        "userId": 1,
        "taskId": 1,
        "startTime": "2025-10-20T12:00:00.000Z",
        "endTime": "2025-10-30T12:00:00.000Z",
        "duration": 240,
        "createdAt": "2025-10-20T18:27:25.436Z",
        "task": {
            "id": 1,
            "title": "Complete project",
            "description": null,
            "dueDate": "2025-10-30T00:00:00.000Z",
            "priority": "HIGH",
            "timeSpent": 0,
            "completed": false,
            "attachment": null,
            "userId": 1,
            "categoryId": 1,
            "createdAt": "2025-10-19T18:40:51.740Z",
            "updatedAt": "2025-10-19T18:40:51.740Z"
        }
    }
}
```

### Delete Timelog
- **PUT** `/api/timelogs/6`
- **Body:**
```json
{
    "taskId": 1,
    "userId": 1,
    "startTime": "2025-10-20T12:00:00.000Z",
    "endTime": "2025-10-30T12:00:00.000Z",
    "priority": "SMALL"
}
```
- **Response:**
```json
{
    "message": "Timelog deleted successfully"
}
```
---

## 📝 Validation Rules

### User 
- **name**: Name must be between 2 and 100 characters
- **email**: Valid email format
- **birthDate**: birthDate must be a valid date
- **password**: Password must be at least 6 characters

### Task
- **title**: Title must be between 2 and 200 characters
- **priority**: Priority must be LOW, MEDIUM, or HIGH

### Category
- **name**: category name must be between 2 and 100 characters

### Timelog
- **userId**: userId must be an intege
- **taskId**: taskId must be an integer
- **startTime**: startTime must be a valid date

---

## ❌ Error Responses

### Standard Error Format
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

### Validation Errors
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters long"
    }
  ]
}
```

### Common HTTP Status Codes
- **200** - Success
- **201** - Created
- **400** - Bad Request (validation error)
- **401** - Unauthorized (missing or invalid token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **500** - Internal Server Error

---

