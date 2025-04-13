
---

# 🧠 BuddhuAI Backend Service

A scalable Node.js backend service for the **BuddhuAI** application, built with TypeScript and Express.js. This service acts as the core engine handling client requests, integrating with MongoDB, external LLMs (via **Gemini API**), and user authentication via **Auth0**.

---

## 🏗️ Architecture

The project follows a **3-layer architecture**:

```plaintext 
src/
├── routes/ # API route definitions
├── controllers/ # Request/response handling logic
├── services/ # Business/data logic & external API calls
├── models/ # Mongoose schemas for MongoDB
├── config/ # Database and environment config
├── utils/ # Logging and helpers
├── app.ts # Express app initialization
```

### Highlights

- **TypeScript**-based modern Express.js backend
- **MongoDB Atlas** + **Mongoose** ODM
- **Auth0** integration using `express-openid-connect`
- **LLM support** via **Google Gemini API**
- **Winston** for structured logging
- Clean separation of concerns via layered architecture

---

## ⚙️ Tech Stack

| Category        | Technology                              |
| --------------- | --------------------------------------- |
| Runtime         | Node.js                                 |
| Framework       | Express.js                              |
| Language        | TypeScript                              |
| Database        | MongoDB Atlas                           |
| ODM             | Mongoose                                |
| Auth            | Auth0                                   |
| LLM Integration | Google Gemini (`@google/generative-ai`) |
| Logging         | Winston                                 |
| Utilities       | `dotenv`, `date-fns`                    |

---

## 🔐 Environment Setup

Create a `.env` file in the root directory:

```dotenv
# Server
PORT=8000
FRONTEND_URL=https://localhost:5173

# MongoDB
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>/BuddhuAI?retryWrites=true&w=majority"

# Gemini API
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"

# Auth0
AUTH0_SECRET="LONG_RANDOM_SECRET"
AUTH0_BASE_URL="http://localhost:8000"
AUTH0_CLIENT_ID="YOUR_AUTH0_CLIENT_ID"
AUTH0_ISSUER_BASE_URL="https://YOUR_AUTH0_DOMAIN"
```

---

## 🚀 Getting Started

1. **Clone & Install**

   ```bash
   git clone <repo-url>
   cd <repo-directory>
   npm install
   ```

2. **Environment Setup**

   - Create `.env` file using the format above.

3. **Run the Server**

   - Development mode:

     ```bash
     npm run dev
     ```

   - Production build:
     ```bash
     npm run build
     npm start
     ```

---

## 📡 API Overview

Base route: `/api/:username`

| Method | Endpoint              | Description                                     |
| ------ | --------------------- | ----------------------------------------------- |
| GET    | `/new-chat`           | Generate a new unique Chat ID                   |
| GET    | `/:chatId`            | Retrieve a specific chat session                |
| GET    | `/all-chats`          | Get metadata for all user chats                 |
| GET    | `/chat-streak`        | Fetch dates with existing chats (calendar view) |
| GET    | `/moods`              | Get mood strings from last 7 journal entries    |
| GET    | `/journal/:journalId` | Retrieve a specific journal entry               |

> Authenticated routes are protected via Auth0 middleware.

---

## 📁 Key Files

| File                                | Purpose                            |
| ----------------------------------- | ---------------------------------- |
| `src/app.ts`                        | App setup, middleware, CORS, Auth0 |
| `src/routes/index.ts`               | Routes mapping                     |
| `src/controllers/dataController.ts` | Request/response handling          |
| `src/services/dataService.ts`       | Core logic & external API calls    |
| `src/models/ChatSession.ts`         | Chat history schema                |
| `src/models/JournalEntry.ts`        | Journal entry schema               |
| `src/config/database.ts`            | MongoDB connection                 |
| `src/utils/logger.ts`               | Winston logging config             |

---

## 🧪 Scripts

| Command       | Description                  |
| ------------- | ---------------------------- |
| `npm run dev` | Start dev server with reload |

---
