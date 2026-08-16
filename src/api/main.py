"""FastAPI bridge for backend integration tests.

The Next.js app already has /api/chat and /api/search routes. This Python API is
for teammates who want a FastAPI endpoint during the hackathon.
"""

from __future__ import annotations

from fastapi import FastAPI
from pydantic import BaseModel

from src.retrieval.local_search import search_chunks

app = FastAPI(title="Campus Saathi RAG API")


class QueryRequest(BaseModel):
    query: str
    category: str = "all"
    limit: int = 5


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/query")
def query(request: QueryRequest) -> dict[str, object]:
    sources = search_chunks(request.query, category=request.category, limit=request.limit)
    if not sources:
        return {
            "answer": "I could not find this information in the campus knowledge base yet.",
            "sources": [],
        }

    answer = "Based on the campus knowledge base:\n\n" + "\n\n".join(
        f"- {source['content']}" for source in sources[:3]
    )
    return {"answer": answer, "sources": sources}
