# Satakshi DB + AIML Phase Guide

This project now has two working paths:

1. Demo path: the Next.js API returns answers from local demo knowledge when API keys are missing.
2. Real RAG path: Gemini creates embeddings, Supabase pgvector stores them, and `/api/chat` retrieves sources before generating an answer.

## Your Side Setup

Create these accounts:

- Supabase: create a free project at `https://supabase.com`
- Google AI Studio: create a free Gemini API key at `https://aistudio.google.com/app/apikey`

In Supabase:

1. Open your Supabase project.
2. Go to SQL Editor.
3. Paste and run `database/supabase/schema.sql`.
4. Go to Project Settings -> API.
5. Copy Project URL, anon key, and service role key.

In the project:

1. Copy `.env.example` to `.env`.
2. Copy `frontend/.env.local.example` to `frontend/.env.local`.
3. Fill the same Gemini key and Supabase values in both files.

Important: never paste the service role key into screenshots, GitHub, or frontend client code.

## Add Campus Data

Put real campus documents in `data/raw/`.

Supported now:

- `.md`
- `.txt`
- `.csv`
- `.pdf`

Good first files:

- admission brochure
- fee structure
- placement report
- scholarship FAQ
- hostel rules
- library timings
- complaints/helpdesk SOP
- events/notices

## Build Chunks

From project root:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python src/ingestion/chunk_documents.py
```

Output:

```text
data/processed/chunks.json
```

## Upload Embeddings To Supabase

After `.env` is filled:

```bash
python src/embeddings/embed_and_upload.py
```

This will:

- read `data/processed/chunks.json`
- call Gemini `text-embedding-004`
- insert rows into Supabase `documents`

## Run The App

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:3000/chat
```

## Test Queries For Demo

Use these after uploading real or sample data:

- What documents are required for B.Tech admission?
- What are the placement statistics?
- What are the library timings?
- How do I register a complaint?
- What student services are available?

## What You Should Tell Judges

- We clean and chunk campus documents.
- We convert every chunk into Gemini embeddings.
- We store vectors in Supabase PostgreSQL with pgvector.
- For each question, we embed the query and retrieve top matching chunks.
- Gemini answers only from retrieved context and returns source citations.
- If information is missing, the assistant says it is not available instead of guessing.
