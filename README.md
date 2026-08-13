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

