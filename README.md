# 🧠 Buddhu.ai: Your Reflective Second Brain

**Buddhu.ai** is a personalized journaling and emotional well-being platform that leverages intelligent conversations and memory tracking to help users reflect, grow, and understand themselves better. With a sleek interface, AI-powered chat, and timeline-based memory widgets, Buddhu.ai becomes your second brain — offering support, guidance, and insight based on your own thoughts.

![image](https://github.com/user-attachments/assets/83dd7b1e-442e-4d2f-bc7a-70348ce104e4)

---

## ✨ Features

### 📅 Daily Memory Widgets

- Quickly recall memories from:
  - **Today**
  - **2 Days Ago**
  - **1 Week Ago**
  - **1 Month Ago**
- Each memory is shown with a **one-line summary** for quick mental recall and reflection.

### 📊 Mood History Tracker

- Visual week-wise display of your mood throughout the week.
- Icon-based view to show highs, lows, and neutral days.

### 🗓️ Journal Activity Calendar

- Tracks days when journals were written.
- A tick icon replaces the date on active days, forming a visible **streak** tracker.

---

## 💬 Core Features

### 🪞 The Mirror (AI Chat)

- A smart AI interface for open-ended chats.
- Ask Buddhu.ai: “Is there anything I’ve written that could help me right now?”
- Responds with insights pulled from your own past logs using LLM + Vector DB.
- Typing animations, voice/image inputs, and friendly suggestions included.

### 📝 Mann Ki Baat (Daily Recording)

Choose between two modes:

1. **Freeform Journal** – A traditional text entry to reflect on your day.
2. **Guided Reflection** – AI-driven questioning that guides you to write more deeply about your experiences.

Both modes are synced to your timeline, mood logs, and suggestion engine.

---

## 🧩 Tech Stack

| Layer     | Tech Stack                                |
| --------- | ----------------------------------------- |
| Frontend  | React, TypeScript, TailwindCSS            |
| Backend   | Node.js, Express                          |
| Auth      | Auth0 (SSO Integration)                   |
| Database  | MongoDB                                   |
| Vector DB | Pinecone / Chroma / Qdrant (configurable) |
| AI Model  | LLM (OpenAI/GPT-based or local LLM)       |
| Scheduler | Celery (for daily summary and heartbeats) |

---

## 🧠 How It Works

1. **Auth Flow**

   - Users authenticate via **Auth0 SSO**.
   - Client fetches session data and routes accordingly.

2. **Mirror Conversations**

   - User chat input is processed by the **LLM**, which fetches related memory data from **Vector DB** and **MongoDB**.
   - Suggestions and chat history are returned to the client.

3. **Memory Handling**

   - Daily logs and metadata (including mood) are stored in **MongoDB**.
   - A cron process summarizes and compresses old data, maintaining a performant memory timeline.

4. **Widgets & Analytics**
   - The frontend displays widgets based on MongoDB queries, including the streak calendar, mood chart, and memory summaries.

---

## 📦 Features in Development

- Mobile responsive UI
- In-app voice journaling transcription
- AI recommendations based on life events
- Sentiment heatmap and insights panel

---

## 📸 Screenshots / Demo

_Coming soon._

---

<!--
## 📂 Folder Structure (Frontend)

```
📁 src
├── 📁 components       // Reusable UI Components
├── 📁 pages            // Page-level views like Mirror, Mann Ki Baat
├── 📁 utils            // Utility functions
├── 📁 hooks            // Custom hooks
├── 📁 api              // API interactions
└── index.tsx          // Entry point
``` -->

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/buddhu.ai.git
cd budhhu.ai

# Install dependencies
npm install

# Start the dev server
npm run dev
```

---

## 🙌 Contributions

| Name                 | GitHub Profile                                   |
| -------------------- | ------------------------------------------------ |
| Aditya Mittal        | [@adityamittl](https://github.com/adityamittl)   |
| Raghav Khanna        | [@teammate1](https://github.com/raghav-khanna)   |
| Krishna Kulshreshtha | [@Krishnaaa-29](https://github.com/Krishnaaa-29) |
| Vansh Mahajan        | [@Vansh-0108](https://github.com/Vansh-0108)     |

Want to contribute? Please open issues or submit pull requests. For major changes, open a discussion first.

---

<!-- ## 🧑‍💻 Author

Made with ❤️ by [Your Name] – passionate about mental health, AI, and digital self-care.

--- -->

<!-- ## 📄 License

MIT License -->
