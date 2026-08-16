"""Generate Gemini embeddings for chunks and upload them to Supabase.

Prereqs:
  1. Run database/supabase/schema.sql in Supabase SQL Editor.
  2. Copy .env.example to .env and fill GOOGLE_AI_API_KEY, SUPABASE_URL,
     SUPABASE_SERVICE_ROLE_KEY.
  3. Run: python src/ingestion/chunk_documents.py
  4. Run: python src/embeddings/embed_and_upload.py
"""

from __future__ import annotations

import argparse
import json
import os
import time
from pathlib import Path
from typing import Any

import google.generativeai as genai
import requests
from dotenv import load_dotenv


def require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing {name}. Add it to .env first.")
    return value


def embed(text: str) -> list[float]:
    response = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text,
        task_type="retrieval_document",
        output_dimensionality=768,
    )
    return response["embedding"]


def upload_batch(supabase_url: str, service_key: str, rows: list[dict[str, Any]]) -> None:
    endpoint = f"{supabase_url.rstrip('/')}/rest/v1/documents"
    response = requests.post(
        endpoint,
        headers={
            "apikey": service_key,
            "Authorization": f"Bearer {service_key}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
        json=rows,
        timeout=30,
    )
    if response.status_code >= 300:
        raise RuntimeError(f"Supabase upload failed: {response.status_code} {response.text}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--chunks", default=os.getenv("CHUNKS_PATH", "data/processed/chunks.json"))
    parser.add_argument("--batch-size", type=int, default=20)
    parser.add_argument("--sleep", type=float, default=0.15)
    args = parser.parse_args()

    load_dotenv()
    genai.configure(api_key=require_env("GOOGLE_AI_API_KEY"))
    supabase_url = require_env("SUPABASE_URL")
    service_key = require_env("SUPABASE_SERVICE_ROLE_KEY")

    chunks = json.loads(Path(args.chunks).read_text(encoding="utf-8"))
    batch: list[dict[str, Any]] = []
    uploaded = 0

    for chunk in chunks:
        batch.append(
            {
                "title": chunk["title"],
                "content": chunk["content"],
                "category": chunk["category"],
                "source": chunk["source"],
                "chunk_index": chunk["chunk_index"],
                "embedding": embed(chunk["content"]),
                "metadata": {"local_id": chunk["id"]},
            }
        )
        time.sleep(args.sleep)

        if len(batch) >= args.batch_size:
            upload_batch(supabase_url, service_key, batch)
            uploaded += len(batch)
            print(f"Uploaded {uploaded}/{len(chunks)} chunks")
            batch = []

    if batch:
        upload_batch(supabase_url, service_key, batch)
        uploaded += len(batch)

    print(f"Done. Uploaded {uploaded} chunks to Supabase.")


if __name__ == "__main__":
    main()
