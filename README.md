# 📌 TODO API (File-Based)

A simple **file-based TODO REST API** built with **Express.js** — no database required.
All TODO items are stored as files in the project.

---

## 🧠 Overview

This is a lightweight backend that lets you create, list, update, and delete TODO items using HTTP endpoints.
Perfect for learning APIs or small projects where a full database is overkill.

The API organizes code into clean folders (`routes`, `model`, `controller`, etc.) and uses basic file storage. This is **not meant for production** but useful for learning and prototyping.

---

## 🚀 Features

✔ Express.js server
✔ REST API for TODOs
✔ File-based storage (no database)
✔ Input validation
✔ Security & rate limiting
✔ Request logging
✔ Custom error handling

---

## 🎯 Endpoints

**Health Check**

```
GET /test
```

Returns a simple status:

```json
{
  "success": true,
  "message": "API is healthy"
}
```

**TODO API Root**

```
GET /
```

Basic test response:

```json
{ "success": true, "message": "Testing API..." }
```

**CRUD TODO Endpoints**
Located under:

```
/api/todo
```

Typical routes include:

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| POST   | /api/todo     | Create new TODO   |
| GET    | /api/todo     | List all TODOs    |
| GET    | /api/todo/:id | Get a single TODO |
| PUT    | /api/todo/:id | Update a TODO     |
| DELETE | /api/todo/:id | Delete a TODO     |

---

## 📦 Requirements

You need:

* Node.js (v18+ recommended)
* npm (comes with Node)

---

## 💻 Installation

Clone the repo:

```bash
git clone https://github.com/sayyedaaman2/todo_api_file_based.git
cd todo_api_file_based
```

Install dependencies:

```bash
npm install
```

---

## 🛠 Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` to set:

```
PORT=5000
CLIENT_URL=http://localhost:3000
```

---

## 📡 Run the Server

Start in development mode:

```bash
npm start
```

The API runs on:

```
http://localhost:<PORT>
```

Use Postman, curl, or your frontend to hit endpoints.

---

## 📁 File Organization

```
├── config/       # Env & server configs
├── controller/   # Business logic
├── model/        # TODO model + helpers
├── routes/       # API endpoints
├── utilities/    # Logger, helpers
├── lib/          # File storage & DB init
├── logs/         # Generated logs
├── middleware/   # Request filters, validation
├── validator/    # Input validation rules
├── app.js        # Entry point
├── .env.example
└── package.json
```

---

## 🧪 Testing the API

Healthy server test:

```bash
curl http://localhost:<PORT>/test
```

Add TODO:

```bash
curl -X POST http://localhost:<PORT>/api/todo \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk","description":"From the store"}'
```

---

## 🧩 Notes

* This project **doesn’t use a database** — it simulates one using file storage.
* Useful for prototyping and educational purposes.
* Not intended for large scale or production use without enhancements.

---

## 📬 Contributions & Feedback

Improvements and fixes welcome! Just open a pull request.

---

## 📜 License

Use as you want — MIT recommended (but add a LICENSE file if you choose MIT).

---

If you want, I can also add usage examples (Postman export or Swagger spec) and make it more comprehensive for contributors.
