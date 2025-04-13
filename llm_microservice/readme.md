<h1 align="center">🧠 AI Chat Memory Microservice</h1>

<p align="center">
  A FastAPI-based microservice for managing long-term user memory using VectorDB, MongoDB, and Celery.
</p>

<p align="center">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/your-username/your-repo-name?color=blue">
  <img alt="Docker build" src="https://img.shields.io/badge/docker-ready-blue">
  <img alt="License" src="https://img.shields.io/github/license/your-username/your-repo-name?style=flat-square">
  <img alt="Issues" src="https://img.shields.io/github/issues/your-username/your-repo-name?color=orange">
  <img alt="Last Commit" src="https://img.shields.io/github/last-commit/your-username/your-repo-name?color=green">
</p>

---

## 🧩 Architecture

+---------------------+         +----------------+         +------------------+
|                     |         |                |         |                  |
|   Google LLM / LLM  +<------->+  Microservice  +<------->+     MongoDB      |
| (generative AI API) |         | (FastAPI App)  |         |  (Long-term DB)  |
|                     |         |                |         |                  |
+----------+----------+         +-------+--------+         +--------+---------+
           ▲                            ▲                           ▲
           |                            |                           |
           |                            |                           |
           |                            +---------------------------+
           |                                        |
           |                                     Celery
           |                         (Background Summarizer Worker)
           |
    +------+------+
    |  VectorDB   |
    | (ChromaDB)  |
    +-------------+



---

## 🚀 Features

- 🧠 Semantic chat memory with **ChromaDB**
- 📦 Long-term memory storage in **MongoDB**
- ⚙️ Background memory summarization via **Celery**
- 🧠 LLM-powered (Google Generative AI)
- 🌐 Exposes a lightweight **FastAPI** REST microservice
- 🐳 Containerized with **Docker** for easy deployment

---

## 🧱 Tech Stack

| Layer                  | Tech                     |
|------------------------|--------------------------|
| API Framework          | FastAPI                  |
| Server                 | Uvicorn                  |
| VectorDB               | ChromaDB                 |
| Memory DB              | MongoDB (PyMongo)        |
| LLM Integration        | Google Generative AI     |
| Async Tasks            | Celery + Redis           |
| Containerization       | Docker                   |

---

## ⚙️ Run with Docker

### 🔧 Build Docker Image

```bash
docker build -t chat-memory-service .
```

## ▶️ Run the Container
```bash
docker run -p 54321:54321 chat-memory-service
```
> API will be running at: ```http://localhost:54321```

## 🧵 Celery Worker Setup

To enable background processing for summarizing long-term memory, we use **Celery** with **Redis** as the message broker.

---

### 🚀 Step 1: Start Redis (if not already running)

You can use Docker for a quick setup:

```bash
docker run -d -p 6379:6379 redis
```

> Redis will be available at `localhost:6379`.

---

### ⚙️ Step 2: Run the Celery Worker

From the project root (where `app.tasks` is defined):

```bash
celery -A app.tasks worker --loglevel=info
```

This command launches the Celery worker, which will listen for and process background tasks such as memory summarization.

---

### ⏱️ Optional: Run the Celery Beat Scheduler

If you're using periodic summarization tasks (e.g., scheduled every hour or day), start the Celery beat service:

```bash
celery -A app.tasks beat --loglevel=info
```

This will schedule and enqueue periodic jobs defined in your Celery config.

---

### ✅ Confirm Everything is Working

You should see logs like:

```
[INFO/MainProcess] Connected to redis://localhost:6379//
[INFO/MainProcess] Ready to process tasks.
```
