<h1 align="center">🌙✨ <span style="color:#00FFFF;">MoonChat-AI</span> — Next-Gen AI Chat System 🚀</h1> <p align="center"> <img src="https://img.shields.io/badge/Full%20Stack-MERN-blueviolet?style=for-the-badge"/> <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/> <img src="https://img.shields.io/badge/Powered%20By-Gemini%20AI-00FFFF?style=for-the-badge"/> <img src="https://img.shields.io/github/license/Girishmasade/Ai-Chat-System-using-js?style=for-the-badge"/> </p> <p align="center"> <b>A futuristic AI-powered chat system that blends real-time intelligence, sleek neon UI, and modern web technology.</b> </p>

 <p align="center" style="margin: 30px 0;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="55" height="55" style="margin: 0 15px;"/> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="55" height="55" style="margin: 0 15px;"/> 
  <img src="https://www.pngfind.com/pngs/m/136-1363736_express-js-icon-png-transparent-png.png" alt="Express" width="55" height="55" style="margin: 0 15px;"/> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="55" height="55" style="margin: 0 15px;"/> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/passport/passport-original.svg" alt="Passport.js" width="55" height="55" style="margin: 0 15px;"/> 
  <img src="https://img.shields.io/badge/OAuth-000000?style=for-the-badge&logo=OAuth&logoColor=white" alt="OAuth" style="margin: 0 15px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="Redux" width="55" height="55" style="margin: 0 15px;"/>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVSRkCHOvhw_BKVpwLyGwi5RfMxXmXwquQ2A&s" alt="Tailwind CSS" width="55" height="55" style="margin: 0 15px;"/>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT38gQ0V1HH_KQa5OH98s3lvzurt9O2cR0KsQ&s" alt="Ant Design" width="55" height="55" style="margin: 0 15px;"/>
</p>


# 🌙 MoonChat-AI

MoonChat-AI is a real-time, generative AI-powered chat platform built using the MERN stack and Groq AI. It combines real-time messaging with intelligent AI responses using memory and Retrieval-Augmented Generation (RAG).

---

## 🚀 Features

* 💬 Real-time one-to-one chat (Socket.io)
* 🤖 AI chat powered by Groq (LLaMA models)
* 🧠 Context-aware responses using chat memory
* 🔍 RAG (Retrieval-Augmented Generation)
* 📂 Vector database integration (Chroma)
* ⚡ Fast responses with Groq inference
* 📎 Media sharing support
* 🔔 Notifications system

---

## 🧱 Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Socket.io

### Database

* MongoDB

### AI & ML

* Groq (LLM)
* LangChain
* Chroma Vector DB
* OpenAI Embeddings

---

## 🧠 How AI Works

1. User sends a message
2. Backend fetches previous chat history (memory)
3. Message is converted into embeddings
4. Vector DB retrieves relevant documents (RAG)
5. AI combines:

   * system prompt
   * chat history
   * retrieved context
6. Groq model generates response
7. Response is stored and sent to frontend

---

## 📦 Project Structure

/server
/config
/models
/services
/lib
/controllers

---

## 🔍 RAG (Retrieval-Augmented Generation)

Instead of guessing answers, the AI:

* Searches relevant documents
* Uses them as context
* Generates accurate responses

---

## ⚡ Future Improvements

* Streaming responses (ChatGPT-like typing)
* AI agents (auto task execution)
* Chat with PDF / documents
* Multi-model support
* Personalized AI memory

---

## 🧪 Installation

```bash
git clone <repo-url>
cd moonchat-ai
npm install
```

Create `.env`:

```env
GROQ_API_KEY=your_key
OPENAI_API_KEY=your_key
```

Run:

```bash
npm run dev
```

**Author**

👤 Girish Masade

💼 Developer | MERN Stack Enthusiast | AI Innovator
📧 Email: girishmasade22@gmail.com

💬 “Building tomorrow’s technology, one project at a time.”

## Feedback

If you have any feedback, please reach out to us at girishmasade22@gmail.com
