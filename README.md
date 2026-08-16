# Campus Saathi — Your AI Campus Companion 🎓

An AI-powered campus Q&A chatbot built with **Next.js**, **Gemini AI**, and **Supabase pgvector**. Students can ask questions about admissions, courses, facilities, events, and more — and get instant, accurate answers with source citations.

Built for a 3-day RAG Hackathon.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Gemini](https://img.shields.io/badge/Gemini-1.5_Flash-blue?logo=google)
![Supabase](https://img.shields.io/badge/Supabase-pgvector-green?logo=supabase)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

- 💬 **AI Chat Interface** — Conversational Q&A with message bubbles, typing indicator, and source citations
- 🔍 **Document Search** — Search across campus documents with category filters and relevance scores
- 📅 **Events & Notices** — Interactive calendar with event cards, countdown timers, and category filters
- 🎙️ **Voice Input** — Speak your questions using Web Speech API (Hindi + English)
- 🌙 **Dark / Light Mode** — Toggle with system preference detection and localStorage persistence
- 📱 **Fully Responsive** — Mobile-first design with hamburger drawer menu
- 🤖 **RAG Pipeline** — Retrieval-Augmented Generation using Gemini + Supabase pgvector
- 🎨 **Premium UI** — Glassmorphism, gradient animations, floating particles, and micro-interactions

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Styling** | Vanilla CSS (CSS Modules) |
| **Vector DB** | Supabase (pgvector) |
| **Embeddings** | Google `text-embedding-004` |
| **LLM** | Gemini 1.5 Flash |
| **Voice Input** | Web Speech API |
| **Icons** | Lucide React |
| **Fonts** | Inter + Outfit (Google Fonts) |

---

## 📁 Project Structure

```
campus-saathi/
├── frontend/                          # Next.js web application
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css            # Design system (250+ CSS variables)
│   │   │   ├── layout.js              # Root layout with Navbar
│   │   │   ├── page.js                # Landing page
│   │   │   ├── chat/page.js           # Chat interface
│   │   │   ├── search/page.js         # Search interface
│   │   │   ├── events/page.js         # Events & Notices
│   │   │   └── api/
│   │   │       ├── chat/route.js      # POST /api/chat — RAG pipeline
│   │   │       ├── search/route.js    # POST /api/search — document search
│   │   │       └── events/route.js    # GET /api/events — events list
│   │   ├── components/
│   │   │   ├── Navbar/                # Fixed navbar with glassmorphism
│   │   │   ├── Hero/                  # Landing page hero section
│   │   │   ├── ChatMessage/           # Chat message bubbles
│   │   │   ├── ChatInput/             # Chat input with voice
│   │   │   ├── SearchCard/            # Search result cards
│   │   │   ├── EventCard/             # Event cards with countdown
│   │   │   └── ThemeToggle/           # Dark/Light mode toggle
│   │   ├── hooks/
│   │   │   ├── useTheme.js            # Theme management hook
│   │   │   ├── useVoiceInput.js       # Voice input hook
│   │   │   └── useChatHistory.js      # Chat state hook
│   │   └── utils/
│   │       └── constants.js           # Config, demo data, categories
│   ├── .env.local                     # API keys (not committed)
│   └── package.json
├── src/                               # Python backend (RAG pipeline)
│   ├── api/                           # FastAPI endpoints
│   ├── ingestion/                     # Document loading + chunking
│   ├── embeddings/                    # Embedding model + vector store
│   ├── retrieval/                     # Similarity search
│   └── llm/                          # Prompt templates + LLM chain
├── data/
│   ├── raw/                           # Original source documents
│   └── processed/                     # Chunked/cleaned data
├── docs/                              # Architecture diagrams, logs
├── tests/                             # Test scripts
├── requirements.txt                   # Python dependencies
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([download](https://git-scm.com/))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/raj-1807/campus-saathi.git
cd campus-saathi

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Create environment file
cp .env.local.example .env.local
# Edit .env.local with your API keys (optional — demo mode works without them)
```

For Satakshi's DB + AIML setup, follow `docs/satakshi-db-aiml-guide.md`.

### Running the App

```bash
# Start the development server
cd frontend
npm run dev
```

Open **http://localhost:3000** in your browser.

### Building for Production

```bash
cd frontend
npm run build
npm start
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
# Google AI API Key (for Gemini LLM + Embeddings)
# Get yours free at: https://aistudio.google.com
GOOGLE_AI_API_KEY=your_key_here

# Supabase (for vector database)
# Get yours free at: https://supabase.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note:** The app works in **demo mode** without any API keys configured. Demo mode returns realistic sample responses for testing the UI.

---

## 🗄️ Supabase Setup (Optional)

To enable real RAG with your own campus data:

1. Create a free project at [supabase.com](https://supabase.com)
2. Run `database/supabase/schema.sql` in Supabase SQL Editor
3. Put real source files into `data/raw/`
4. Run `python src/ingestion/chunk_documents.py`
5. Run `python src/embeddings/embed_and_upload.py`

---

## 🎯 RAG Pipeline

```
User Query
   ↓
Next.js API Route (/api/chat)
   ↓
Google text-embedding-004 (query → 768-dim vector)
   ↓
Supabase pgvector (cosine similarity search, top-5)
   ↓
Retrieved Documents + User Query
   ↓
Gemini 1.5 Flash (generate answer with context)
   ↓
Response + Source Citations → Frontend
```

---

## 👥 Team

| Name | Role |
|---|---|
| You | Lead / Integration & Architecture |
| Satakshi | AI/ML + Database |
| Raj | Frontend + AI/ML Support |
| Palkesh | Backend |
| Prakriti | Backend |
| Ankit | Backend → Research/Pitch |
| Tejaswini | Design/UX + Research/Pitch |

---

## 📋 Hackathon Roadmap

- **Day 1 — Foundation**: Repo setup, Next.js frontend, design system, landing page, chat UI, search UI, events page
- **Day 2 — Integration**: Real data pipeline, Supabase setup, Gemini integration, end-to-end RAG, source citations
- **Day 3 — Polish**: Testing, UI polish, PPT, architecture diagram, documentation, demo rehearsal

---

## 📄 License

This project is built for educational and hackathon purposes.
