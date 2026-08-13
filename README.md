# RAG Hackathon Project

A Retrieval-Augmented Generation (RAG) system built for a 3-day hackathon.

## Team

| Name | Role |
|---|---|
| You | Lead / Integration & Architecture |
| Satakshi | AI/ML + Database |
| Raj | Frontend + AI/ML Support |
| Palkesh | Backend |
| Prakriti | Backend |
| Ankit | Backend → Research/Pitch |
| Tejaswini | Design/UX + Research/Pitch |

## Pipeline

```
User Query
   ↓
Frontend (Streamlit)
   ↓
Backend/API (FastAPI)
   ↓
Query Processing
   ↓
Embedding Model
   ↓
Vector Database (FAISS/Chroma)
   ↓
Relevant Documents Retrieved
   ↓
LLM + Retrieved Context
   ↓
Final Answer + Sources
```

## Tech Stack

Python + LangChain + Sentence Transformers + FAISS (or Chroma) + Gemini API + FastAPI + Streamlit

## Repo Structure

```
rag-hackathon/
├── data/
│   ├── raw/            # original source documents
│   └── processed/      # chunked/cleaned data
├── src/
│   ├── ingestion/      # document loading + chunking
│   ├── embeddings/     # embedding model + vector store setup
│   ├── retrieval/      # similarity search / top-k retrieval
│   ├── llm/             # prompt templates + LLM chain
│   └── api/             # FastAPI app (/query endpoint)
├── frontend/            # Streamlit UI
├── docs/                # architecture diagram, daily logs, PPT notes
├── tests/                # test scripts
├── requirements.txt
└── README.md
```

## Setup

```bash
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Running

```bash
# Backend
uvicorn src.api.main:app --reload

# Frontend (in a separate terminal)
streamlit run frontend/app.py
```

## 3-Day Roadmap

- **Day 1 — Foundation & Individual Modules**: repo/architecture set up, chunking script, embeddings + vector DB on dummy data, LLM API connected, FastAPI mock endpoint, UI skeleton.
- **Day 2 — Integration & Working MVP**: real data through the full pipeline, retrieval → LLM → API → UI connected end-to-end, source/citation display, basic error handling.
- **Day 3 — Testing, Optimization & Presentation**: retrieval tuning, bug fixes, UI polish, PPT + architecture diagram + documentation, judge Q&A rehearsal, backup demo video.

See `docs/daily-log.md` for the running documentation log.

## Must / Should / Nice-to-Have

**Must:** document ingestion + chunking, embeddings + vector DB, working retrieval, LLM answer generation, basic UI, source/citation display, end-to-end integration tested, PPT + architecture diagram, 3–5 rehearsed demo queries.

**Should:** better prompt engineering, edge-case error handling, UI polish, larger test dataset, "not found" fallback.

**Nice to have:** chat history, multi-format file support, public deployment, re-ranking/hybrid search, analytics dashboard.
